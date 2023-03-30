import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../assets/images/logo/Logo.png'
import { fetchUserList, fetchUserMessages } from '../../../services/receptionist/apiReceptionChat';
import './ReceptionistChat.scss'

const ChatListItem = ({item}) => {

    const { patientId } = useParams();
    const isActive = patientId === item?.user?.id;

    return (
        <Link to={`/receptionist/chat/${item?.user?.id}`} className="user-chatbox text-decoration-none">
            <div className={"card p-2 d-flex flex-row flex-wrap align-items-center mb-2" + (item?.seen ? null : " fw-bold") + (isActive ? " bg-info text-white" : null)}>
                <img className="avatar card-img-top border border-1 border-primary rounded-circle" src={item?.user?.imageURL} alt="avatar" />
                <div className="card-body">
                    <div className='row'>
                    <div className='col-10'>
                            <h5 className="card-title">{item?.user?.userName}</h5>
                            <small className="card-text text-secondary">{item?.previewContent} | {item?.timeFormatted}</small>
                        </div>
                        <div className="col-2">
                            <span className="badge bg-primary">new</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const Message = (props) => {

    let item = props.item || {

    };

    return (
        <>
            {props.position === 'left'
                ?
                <>
                    <div className='left'>
                        <div className='avatar'>
                            <img src={item?.fromUser?.imageURL} alt="patient"/>
                        </div>
                        <div className="">
                            <div className='text'>{item.content}</div>
                            <div className='time'>{new Date(item?.timeCreated).toLocaleTimeString()}</div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="d-flex justify-content-end">
                        <div className='right'>
                            <div className="">
                                <div className='text'>{item.content}</div>
                                <div className='time'>{new Date(item?.timeCreated).toLocaleTimeString()}</div>
                            </div>
                            <div className='avatar'>
                                <img src={item?.fromUser?.imageURL} alt="patient"/>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}


function ReceptionistChat() {

    const [userList, setUserList] = useState([]);
    const [messageList, setMessageList] = useState([]);

    const getUserList = () => {
        fetchUserList((res) => {
            if(res.status === 200) {
                console.log(res);
                setUserList(res.data)
            }
            else if(res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("System is busy!");
            }
        });
    }

    useEffect(getUserList, []);
    const { patientId } = useParams();
    const currentUser = userList.find(item => item.user.id === patientId)?.user;
    console.log("currentUser: ", currentUser);

    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [paginated, setPaginated] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 0
    });
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        if(currentUser) {
            setIsLoadingMessages(true);
            setMessageList([]);
            fetchUserMessages({
                patientId: currentUser.id,
                page: 1,
                pageSize: 10,
                callback: (res) => {
                    console.log(res);
                    if(res.status === 200) {
                        let messages = res.data.data.reverse();
                        setMessageList(messages);
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

    }, [currentUser]);

    
    const handleSendMessage = (e) => {
        e.preventDefault();


    }
    

    return (
        <>
            <div className="receptionist-chat">
                <h1>Chat box</h1>
                <hr />
                <div className="container-fluid chat-box border shadow-sm">
                    <div className="row h-100">
                        <div className="col-4 p-2 h-100 d-flex flex-column overflow-auto">
                            <div className="user-list-container">
                                <input className="form-control mb-2" type="text" name="search" placeholder="Search..." />
                                <div className="row row-cols-1 g-0">
                                    <div className="col ">
                                        {
                                            userList.map(item => (
                                                <ChatListItem key={item.id} item={item} />
                                            ))
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 p-2 h-100 d-flex flex-column">
                            <div className='meassage-container'>
                                <div className='message-box p-4 bg-info rounded'>
                                    {
                                        isLoadingMessages && (
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border text-primary"></div>
                                            </div>
                                        )
                                    }
                                    {
                                        currentUser ? (
                                            messageList.map(msg => (
                                                <Message position={msg.fromUser.userRole === "Patient" ? "left" : "right"} item={msg}/>
                                            ))
                                        ) : (
                                            <h2 className="text-center text-danger">Please select conversation!</h2>
                                        )
                                    }
                                </div>
                                {
                                    currentUser &&
                                    <div className="input-group">
                                        <form onSubmit={handleSendMessage} className="d-flex w-100 gap-2">
                                            <input className="form-control" type="text" name="" placeholder="Recipient's text" aria-label="Recipient's text" aria-describedby="my-addon" />
                                            <butotn type="submit" className="btn btn-primary input-group-text" id="my-addon">Send</butotn>
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