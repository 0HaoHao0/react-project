import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/images/logo/Logo.png';
import './Chat.scss'
import { fetchUserMessages, postUserMessage, removeMessageAPI } from '../../services/user/ApiChat';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Pusher from 'pusher-js';
import Swal from 'sweetalert2';

const Message = ({ item }) => {

    const [msg, setMsg] = useState(item);

    const removeMessage = () => {

        Swal.fire({
            icon: "warning",
            title: "Remove Message?",
            text: "This action will remove this message completely!",
            showConfirmButton: true,
            showCancelButton: true
        })
        .then(option => {
            if(option.isConfirmed) {
                removeMessageAPI({
                    messageId: msg.id,
                    callback: (res) => {
                        if(res.status === 200) {
                            let message = res.data;
                            setMsg({
                                ...msg,
                                removed: true,
                                content: message.content
                            });

                        }
                    }
                })
            }

            Swal.close();
        });

    }

    return (
        <>
            {msg.position === 'left'
                ?
                <div className='left'>
                    <div className='avatar'>
                        <img src={logo} alt="reception" />
                    </div>
                    <div className="msg-info">
                        <div className='text'>{msg.content}</div>
                        <div className='time'>{new Date(msg.time).toLocaleTimeString()}</div>
                    </div>
                </div>
                :
                <div className='right'>
                    <div className="options-group">
                        {
                            msg.removed ||
                            <button className="btn btn-danger btn-removed" onClick={removeMessage}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        }
                    </div>
                    <div className="msg-info">
                        <div className={`text ${msg.removed ? "text-secondary" : ""}`}>{msg.content}</div>
                        <div className='time'>
                            {
                                item.status === 0 ? (
                                    <>
                                        <span className="text-mute">Sending...</span>
                                    </>
                                ) :

                                item.status === 1 ? (
                                    <>
                                        <span>{new Date(msg.time).toLocaleTimeString()}</span>
                                    </>
                                ) : (
                                    <>
                                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className='avatar'>
                        <img src={msg.imageURL} alt="patient" />
                    </div>
                </div>
            }

        </>
    )
}

function Chat() {

    const [messageList, setMessageList] = useState([]);
    const [isInitLoadingMessages, setIsInitLoadingMessages] = useState(false);
    const [filtered, setFiltered] = useState({
        skip: 0,
        take: 20,
        text: "",
    });

    const [total, setTotal] = useState(0);

    useEffect(() => {

        setIsInitLoadingMessages(true);
        fetchUserMessages({
            params: {
                skip: 0,
                take: 20,
                text: "",
            },
            callback: (res) => {
                if(res.status === 200) {
                    console.log(res);
                    let messages = res.data.data.reverse();
                    let formattedMessages = messages.map((item, idx) => ({
                        id: item.id,
                        position: item.fromUser.userRole === "Patient" ? 'right' : 'left',
                        imageURL: item.fromUser.imageURL,
                        content: item.content,
                        time: item.timeCreated,
                        status: 1,
                        removed: item.isRemoved
                    }));

                    setMessageList(formattedMessages);
                    setTotal(res.data.total);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    toast.error("System is busy!");
                }
                setIsInitLoadingMessages(false);
            }
        });

    }, []); 

    const scroller = useRef(null);
    const scrollToEnd = () => {
        setTimeout(() => {
            scroller.current.scrollTo({
                top: scroller.current.scrollHeight,
                behavior: "smooth"
            });
        }, 200);
    }

    const [initScroll, setInitScroll] = useState(false);
    useEffect(() => {
        if((scroller.current.scrollTop + scroller.current.offsetHeight) / scroller.current.scrollHeight > 0.9) {
            scrollToEnd();
        }
        else if(!initScroll) {
            scrollToEnd();
            setInitScroll(true);
        }
    }, [messageList, initScroll]);


    const [loadMoreDelay, setLoadMoreDelay] = useState(0);
    const [startedCountDown, setStartCountDown] = useState(false);
    const [delayCountDownInterval, setDelayCountDownInterval] = useState(null);

    useEffect(() => {

        if(loadMoreDelay > 0 && !startedCountDown) {
            let _i = setInterval(() => {
                setLoadMoreDelay(prev => prev - 1);
            }, 1000);
            setStartCountDown(true);
            setDelayCountDownInterval(_i);
        }
        else if(loadMoreDelay === 0) {
            if(delayCountDownInterval) clearInterval(delayCountDownInterval);
            setDelayCountDownInterval(null);
            setStartCountDown(false);
        }
    }, [loadMoreDelay, delayCountDownInterval, startedCountDown]);

    const [isLoadMoreMessages, setIsLoadMoreMessages] = useState(false);
    const handleOnScroll = (e) => {
        if(e.target.scrollTop === 0 && !isLoadMoreMessages && loadMoreDelay === 0 && filtered.skip < total) {
            setIsLoadMoreMessages(true);
            let nextFiltered = {
                take: filtered.take,
                skip: filtered.skip + filtered.take,
                text: filtered.text,
            }

            fetchUserMessages({
                params: nextFiltered,
                callback: (res) => {
                    if(res.status === 200) {
                        let messages = res.data.data.reverse();
                        console.log(messages);
                        let formattedMessages = messages.map((item, idx) => ({
                            id: item.id,
                            position: item.fromUser.userRole === "Patient" ? 'right' : 'left',
                            imageURL: item.fromUser.imageURL,
                            content: item.content,
                            time: item.timeCreated,
                            status: 1,
                            removed: item.isRemoved,
                        }));
                        
                        setMessageList([...formattedMessages, ...messageList]);
                        setTotal(res.data.total);
                        setFiltered(nextFiltered);
                    }
                    else if (res.status < 500) {
                        toast.error(res.data);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                    else {
                        toast.error("System is busy!");
                    }
                    setLoadMoreDelay(3);
                    setIsLoadMoreMessages(false);
                }
            })
        }
    }

    const userInfo = useSelector(state => state.user).userInfo;
    const content = useRef(null);
    const handleSendMessage = (e) => {
        e.preventDefault();
        let message = {
            id: 0,
            position: 'right',
            imageURL: userInfo?.imageURL || logo,
            content: content.current.value,
            time: new Date().toISOString(),
            status: 0,
            removed: false,
        }

        let messages = [...messageList, message]
        setMessageList(messages);

        postUserMessage({
            content: content.current.value,
            callback: (res) => {
                if (res.status === 200) {
                    message.id = res.data.id;
                    message.status = 1;
                    message.time = res.data.timeCreated;
                    setFiltered({
                        ...filtered,
                        skip: filtered.skip + 1,
                    });
                }
                else {
                    message.status = -1;
                }
                setMessageList([...messages]);
            }
        });
        
        content.current.value = "";
        
    }

    useEffect(() => {

        const pusherChanel = userInfo?.pusherChannel ? (
            new Pusher('a5612d1b04f944b457a3', {
                cluster: 'ap1',
                encrypted: true,
            })
                .subscribe(userInfo.pusherChannel)) : null;

        const messageReceiveHandler = (action, data) => {
            if (action === "Chat-RecToPat") {
                let message = JSON.parse(data);
                let formattedMessage = {
                    id: message.id,
                    position: 'left',
                    imageURL: logo,
                    content: message.content,
                    time: message.timeCreated,
                    status: 1,
                    removed: false,
                }
                let messages = [...messageList, formattedMessage]
                setMessageList(messages);
                setFiltered(prev => ({
                    ...prev,
                    skip: prev.skip + 1,
                }));
            }
        }

        if (pusherChanel) {
            pusherChanel.bind_global(messageReceiveHandler);
        }

        return () => {
            if (pusherChanel) {
                pusherChanel.unbind_global(messageReceiveHandler);
            }
        }

    }, [userInfo, messageList]);


    return (
        <>
            <div className="user-chat">
                <div className="row layout">
                    
                    <div className="col-lg-7 h-100 d-flex flex-column justify-content-start align-items-end">
                        <h2 className="text-primary mb-2 mt-4">ChatBox</h2>
                        <div className="message-container bg-primary rounded border">
                            <div className="messages-list bg-light rounded" ref={scroller} onScroll={handleOnScroll}>
                                {
                                    isLoadMoreMessages &&
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-primary"></div>
                                    </div>
                                }
                                {
                                    isInitLoadingMessages ? (
                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                            <div className="spinner-border text-primary"></div>
                                        </div>
                                    ) : (
                                        messageList.length > 0 ?
                                        messageList.map((item, idx) => (
                                            <Message key={item.id} item={item}/>
                                        )) : (
                                            <h3 className="text-center text-danger p-3">No have any message.</h3>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 h-100 d-flex flex-column justify-content-center align-items-center">
                        <form className="message-form" onSubmit={handleSendMessage}>
                            <div className="p-3 bg-info rounded">
                                <div className="mb-3">
                                    <label htmlFor="content" className="text-label mb-2">Message: </label>
                                    <textarea ref={content} className="form-control bg-light" cols="30" rows="10" placeholder="Enter your message..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage(e);
                                            }
                                        }}
                                    >
                                    </textarea>
                                </div>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>

                
            </div>
        </>
    );
}

export default Chat;