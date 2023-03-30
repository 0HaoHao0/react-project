import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../assets/images/logo/Logo.png'
import { fetchUserList, fetchUserMessages, postMessage } from '../../../services/receptionist/apiReceptionChat';
import './ReceptionistChat.scss'

const ChatListItem = ({item}) => {

    const { patientId } = useParams();

    return (
        <Link to={`/receptionist/chat/${item.user.id}`}
            className="user-chatbox text-decoration-none">
            <div className={"card px-2 d-flex flex-row align-items-center mb-2" + (item?.seen ? null : " fw-bold") + (patientId === item.user.id ? " bg-info text-white" : null)}>
                <img className="avatar card-img-top border border-1 border-primary rounded-circle" src={item?.user?.imageURL} alt="avatar" />
                <div className="card-body">
                    <div className='row'>
                        <div className='col-12'>
                            <h5 className="card-title">{item?.user?.userName}</h5>
                            <small className="card-text text-secondary">{item?.previewContent} | {item?.timeFormatted}</small>
                        </div>
                    </div>
                    {
                        item.seen || 
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

    return (
        <>
            {item.position === 'left'
                ?
                <div className='left'>
                    <div className='avatar'>
                        <img src={item.imageURL} alt="patient"/>
                    </div>
                    <div className="msg-info">
                        <div className='text'>{item.content}</div>
                        <div className='time'>{new Date(item.time).toLocaleTimeString()}</div>
                    </div>
                </div>
                :
                <div className='right'>
                    <div className="msg-info">
                        <div className='text'>{item.content}</div>
                        <div className='time'>
                            {
                                item.status === 0 ? (
                                    <>
                                        <span className="text-mute">Sending...</span>
                                    </>
                                ) :
                                item.status === 1 ? (
                                    <>
                                        <span>{new Date(item.time).toLocaleTimeString()}</span>
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
                        <img src={logo} alt="reception"/>
                    </div>
                </div>
            }

        </>
    )
}


function ReceptionistChat() {

    const [userList, setUserList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const { patientId } = useParams();
    const [currentConversation, setCurrentConversation] = useState(null);

    const initUserList = () => {
        fetchUserList((res) => {
            if(res.status === 200) {
                if(patientId) {
                    setCurrentConversation(res.data.find(item => item.user.id === patientId));
                }
                setUserList(res.data);
            }
            else if(res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("System is busy!");
            }
        });
    }

    const reloadUserList = () => {
        fetchUserList((res) => {
            if(res.status === 200) {
                setUserList(res.data);
            }
            else if(res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("System is busy!");
            }
        });
    }

    useEffect(initUserList, [patientId]);
    
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [paginated, setPaginated] = useState({
        page: 1,
        pageSize: 10,
    });
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        console.log("Fetch messages of conversation...", currentConversation?.id);
        if(currentConversation) {
            setIsLoadingMessages(true);
            setMessageList([]);
            setTotalPages(0);
            fetchUserMessages({
                patientId: currentConversation.user.id,
                page: 1,
                pageSize: 10,
                callback: (res) => {
                    if(res.status === 200) {
                        let messages = res.data.data.reverse();
                        let formattedMessages = messages.map((item, idx) => ({
                            id: item.id,
                            position: item.fromUser.userRole === "Patient" ? 'left' : 'right',
                            imageURL: item.fromUser.imageURL,
                            content: item.content,
                            time: item.timeCreated,
                            status: 1
                        }));
                        setMessageList(formattedMessages);
                        setTotalPages(res.data.total_pages);
                        setPaginated({
                            page: res.data.page,
                            pageSize: res.data.per_page
                        });
                    }
                    else if(res.status < 500) {
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

    }, [currentConversation]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        let content = e.target.content.value;
        
        if(currentConversation) {
            let message = {
                id: 0,
                position: 'right',
                imageURL: logo,
                content: content,
                time: new Date().toISOString(),
                status: 0
            }

            let messages = [...messageList.slice(1), message]
            setMessageList(messages);
            postMessage({
                patientId: currentConversation.user.id,
                content: content,
                callback: (res) => {
                    if(res.status === 200) {
                        message.id = res.data.id;
                        message.status = 1;
                        message.time = res.data.timeCreated;
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
    

    return (
        <>
            <div className="receptionist-chat">
                <h1>Chat box</h1>
                <hr />
                <div className="container-fluid chat-box border shadow-sm">
                    <div className="row h-100">
                        <div className="col-lg-3 p-2 h-100 d-flex flex-column overflow-auto">
                            <div className="user-list-container">
                                <input className="form-control mb-2" type="text" name="search" placeholder="Search..." />
                                <div className="user-list-box">
                                    {
                                        userList.map(item => (
                                            <ChatListItem key={item.id} item={item}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 p-2 h-100 d-flex flex-column">
                            <div className='meassage-container'>
                                <div className='message-box p-4 rounded border'>
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
                                                <Message key={idx} item={msg}/>
                                            ))
                                        ) : (
                                            <h2 className="text-center text-danger">Please select conversation!</h2>
                                        )
                                    }
                                    {
                                        paginated.page < totalPages &&
                                        <div className="text-center">
                                            <button className="btn text-primary">Load more</button>
                                        </div>
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