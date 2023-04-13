import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../assets/images/logo/Logo.png'
import { fetchUserList, fetchUserMessages, markSeenChatBox, postMessage } from '../../../services/receptionist/apiReceptionChat';
import './ReceptionistChat.scss'

const ChatListItem = ({ item }) => {

    const { patientId } = useParams();
    const [hasNewMessage, setHasNewMessage] = useState(!item.seen);

    useEffect(() => {
        setHasNewMessage(!item.seen);
    }, [item.seen]);

    const handleChatListItemClicked = () => {
        if (hasNewMessage) {
            markSeenChatBox({
                chatboxId: item.id,
                callback: (res) => {
                    if (res.status === 200) {
                        setHasNewMessage(false);
                    }
                }
            });
        }
    }

    return (
        <Link to={`/receptionist/chat/${item.user.id}`}
            onClick={handleChatListItemClicked}
            className="user-chatbox text-decoration-none">
            <div className={"card px-2 d-flex flex-row align-items-center mb-2" + (item.seen ? null : " fw-bold") + (patientId === item.user.id ? " bg-chat-list text-white" : null)}>
                <img className="avatar card-img-top border border-1 border-primary rounded-circle" src={item.user.imageURL} alt="avatar" />
                <div className="card-body">
                    <div className='row'>
                        <div className='col-12'>
                            <h5 className="card-title">{item.user.userName}</h5>
                            <div className="d-flex justify-content-between">
                                <small className="card-text text-secondary preview">{item.previewContent}</small>
                                <small className="card-text text-primary preview-time">{item.timeFormatted}</small>
                            </div>
                        </div>
                    </div>
                    {
                        hasNewMessage &&
                        <div className="new-tag">
                            <span className="badge bg-primary">new</span>
                        </div>
                    }
                </div>
            </div>
        </Link>
    );
}

const Message = ({ item }) => {

    const [msg, setMsg] = useState(item);

    useEffect(() => {
        setMsg(item);
    }, [item]);

    return (
        <>
            {item.position === 'left'
                ?
                <div className='left'>
                    <div className='avatar'>
                        <img src={msg.imageURL} alt="patient" />
                    </div>
                    <div className="msg-info">
                        <div className={`text ${msg.removed ? "text-info" : ""}`}>{msg.content}</div>
                        <div className='time'>{new Date(msg.time).toLocaleTimeString()}</div>
                    </div>
                </div>
                :
                <div className='right'>
                    <div className="msg-info">
                        <div className='text'>{msg.content}</div>
                        <div className='time'>
                            {
                                msg.status === 0 ? (
                                    <>
                                        <span className="text-mute">Sending...</span>
                                    </>
                                ) :
                                    msg.status === 1 ? (
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
                        <img src={logo} alt="reception" />
                    </div>
                </div>
            }

        </>
    )
}


const seenAsync = ({ chatboxId, succeed }) => {
    markSeenChatBox({
        chatboxId: chatboxId,
        callback: (res) => {
            if (res.status === 200) {
                succeed();
            }
        }
    });
}

function ReceptionistChat() {

    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState({
        take: 10,
        skip: 0,
        userName: null,
    });
    const [messageList, setMessageList] = useState([]);
    const { patientId } = useParams();
    const [currentConversation, setCurrentConversation] = useState(null);
    const navigate = useNavigate();

    const initUserList = () => {
        setMessageList([]);
        setFiltered({
            skip: 0,
            take: 20,
            text: "",
        });
        fetchUserList({
            params: filteredUserList,
            callback: (res) => {
                if (res.status === 200) {
                    setUserList(res.data);
                    if (patientId) {
                        let conv = res.data.find(item => item.user.id === patientId);
                        if (conv != null) {
                            setCurrentConversation(conv);

                            if (conv.seen === false) {
                                seenAsync({
                                    chatboxId: conv.id, succeed: () => {
                                        fetchUserList({
                                            params: filteredUserList,
                                            callback: (res) => {
                                                if (res.status === 200) {
                                                    console.log(res.data);
                                                    setUserList(res.data);
                                                }
                                                else if (res.status < 500) {
                                                    toast.error(res.data);
                                                }
                                                else {
                                                    toast.error("System is busy!");
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                    else {
                        let conv = res.data.length ? res.data[0] : null;
                        if (conv != null) navigate("/receptionist/chat/" + conv.user.id);
                    }
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("System is busy!");
                }
            }
        });
    }

    const reloadUserList = () => {
        fetchUserList({
            params: filteredUserList,
            callback: (res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setUserList(res.data);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("System is busy!");
                }
            }
        });
    }

    useEffect(initUserList, [patientId, navigate, filteredUserList]);

    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [filtered, setFiltered] = useState({
        skip: 0,
        take: 20,
        text: "",
    });

    const [total, setTotal] = useState(0);

    useEffect(() => {

        if (currentConversation) {

            console.log("Fetch messages of conversation...");
            setTotal(0);
            setIsLoadingMessages(true);
            fetchUserMessages({
                patientId: currentConversation.user.id,
                params: {
                    skip: 0,
                    take: 20,
                    text: "",
                },
                callback: (res) => {
                    if (res.status === 200) {
                        let messages = res.data.data.reverse();
                        let formattedMessages = messages.map((item, idx) => ({
                            id: item.id,
                            position: item.fromUser.userRole === "Patient" ? 'left' : 'right',
                            imageURL: item.fromUser.imageURL,
                            content: item.content,
                            time: item.timeCreated,
                            status: 1,
                            removed: item.isRemoved,
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
                    setIsLoadingMessages(false);
                }
            });
        }
        else {

        }

    }, [currentConversation]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        let content = e.target.content.value;

        if (currentConversation) {
            let message = {
                id: 0,
                position: 'right',
                imageURL: logo,
                content: content,
                time: new Date().toISOString(),
                status: 0,
                removed: false,
            }

            let messages = [...messageList, message]
            setMessageList(messages);
            postMessage({
                patientId: currentConversation.user.id,
                content: content,
                callback: (res) => {
                    if (res.status === 200) {
                        message.id = res.data.id;
                        message.status = 1;
                        message.time = res.data.timeCreated;
                        setFiltered({
                            ...filtered,
                            skip: filtered.skip + 1
                        });
                    }
                    else {
                        message.status = -1;
                    }
                    setMessageList([...messages]);
                    reloadUserList();
                }
            });
            e.target.content.value = "";
        }

    }


    const receptionInfo = useSelector(state => state.user).userInfo;
    useEffect(() => {

        const pusherChanel = receptionInfo.pusherChannel ? (
            new Pusher('a5612d1b04f944b457a3', {
                cluster: 'ap1',
                encrypted: true,
            })
                .subscribe(receptionInfo.pusherChannel)) : null;

        const messageReceiveHandler = (action, data) => {
            if (action === "Chat-PatToRec") {
                let message = JSON.parse(data);
                if (message.fromUser.id === patientId) {
                    let formattedMessage = {
                        id: message.id,
                        position: 'left',
                        imageURL: message.fromUser.imageURL,
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
                    markSeenChatBox({
                        chatboxId: currentConversation.id,
                        callback: () => {
                            fetchUserList({
                                params: filteredUserList,
                                callback: (res) => {
                                    if (res.status === 200) {
                                        console.log(res.data);
                                        setUserList(res.data);
                                    }
                                    else if (res.status < 500) {
                                        toast.error(res.data);
                                    }
                                    else {
                                        toast.error("System is busy!");
                                    }
                                }
                            });
                        }
                    });
                }
                else {
                    fetchUserList({
                        params: filteredUserList,
                        callback: (res) => {
                            if (res.status === 200) {
                                console.log(res.data);
                                setUserList(res.data);
                            }
                            else if (res.status < 500) {
                                toast.error(res.data);
                            }
                            else {
                                toast.error("System is busy!");
                            }
                        }
                    });
                }

            }

            if (action === "Chat-RemoveMessage") {
                let message = JSON.parse(data);
                console.log("Removed: ", message);

                let formattedMessage = {
                    id: message.id,
                    position: 'left',
                    imageURL: message.fromUser.imageURL,
                    content: message.content,
                    time: message.timeCreated,
                    status: 1,
                    removed: true,
                }

                let messages = messageList.map(item => item.id === message.id ? formattedMessage : item);
                setMessageList(messages);

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

    }, [receptionInfo, patientId, messageList, currentConversation, filteredUserList]);

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
        if ((scroller.current.scrollTop + scroller.current.offsetHeight) / scroller.current.scrollHeight > 0.9) {
            scrollToEnd();
        }
        else if (!initScroll) {
            scrollToEnd();
            setInitScroll(true);
        }
    }, [messageList, initScroll]);

    useEffect(() => {
        setInitScroll(false);
    }, [patientId]);

    const [loadMoreDelay, setLoadMoreDelay] = useState(0);
    const [startedCountDown, setStartCountDown] = useState(false);
    const [delayCountDownInterval, setDelayCountDownInterval] = useState(null);

    useEffect(() => {

        if (loadMoreDelay > 0 && !startedCountDown) {
            let _i = setInterval(() => {
                setLoadMoreDelay(prev => prev - 1);
            }, 1000);
            setStartCountDown(true);
            setDelayCountDownInterval(_i);
        }
        else if (loadMoreDelay === 0) {
            if (delayCountDownInterval) clearInterval(delayCountDownInterval);
            setDelayCountDownInterval(null);
            setStartCountDown(false);
        }
    }, [loadMoreDelay, delayCountDownInterval, startedCountDown]);

    const handleOnScroll = (e) => {
        if (e.target.scrollTop === 0 && !isLoadingMessages && loadMoreDelay === 0 && filtered.skip < total) {

            setIsLoadingMessages(true);

            let nextFiltered = {
                take: filtered.take,
                skip: filtered.skip + filtered.take,
                text: filtered.text,
            }
            fetchUserMessages({
                patientId: currentConversation.user.id,
                params: nextFiltered,
                callback: (res) => {
                    if (res.status === 200) {
                        let messages = res.data.data.reverse();
                        let formattedMessages = messages.map((item, idx) => ({
                            id: item.id,
                            position: item.fromUser.userRole === "Patient" ? 'left' : 'right',
                            imageURL: item.fromUser.imageURL,
                            content: item.content,
                            time: item.timeCreated,
                            status: 1,
                            removed: item.isRemoved,
                        }));

                        messages = [...formattedMessages, ...messageList];
                        setMessageList(messages);
                        setTotal(res.data.total);
                        setFiltered(nextFiltered);
                    }
                    else {
                        toast.error("System is busy!");
                    }
                    setLoadMoreDelay(3);
                    setIsLoadingMessages(false);
                }
            })
        }
    }

    return (
        <>
            <div className="receptionist-chat">
                <h1>Chat box</h1>
                <hr />
                <div className="container-fluid chat-box border shadow-sm">
                    <div className="row h-100">
                        <div className="col-lg-3 p-2 h-100 d-flex flex-column overflow-auto">
                            <div className="user-list-container">
                                <input className="form-control mb-2" type="text" name="search" placeholder="Search..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFilteredUserList({
                                                ...filteredUserList,
                                                userName: e.target.value
                                            })
                                        }
                                    }}
                                />
                                <div className="user-list-box">
                                    {
                                        userList.map(item => (
                                            <ChatListItem key={item.id} item={item} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 p-2 h-100 d-flex flex-column">
                            <div className='meassage-container'>
                                <div className='message-box p-4 rounded border bg-light' ref={scroller} onScroll={handleOnScroll}>
                                    {
                                        isLoadingMessages && (
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border text-primary"></div>
                                            </div>
                                        )
                                    }
                                    {
                                        currentConversation ? (
                                            messageList.map((msg, idx) => (
                                                <Message key={msg.id} item={msg} />
                                            ))
                                        ) : (
                                            <h2 className="text-center text-danger">Please select conversation!</h2>
                                        )
                                    }
                                </div>
                                {
                                    currentConversation &&
                                    <div className="input-group">
                                        <form onSubmit={handleSendMessage} className="d-flex w-100 gap-2">
                                            <input autoComplete="off" className="form-control" type="text" name="content" placeholder="Recipient's text" aria-label="Recipient's text" aria-describedby="my-addon" />
                                            <button type="submit" className="btn btn-primary input-group-text" id="my-addon">Send</button>
                                        </form>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ReceptionistChat;