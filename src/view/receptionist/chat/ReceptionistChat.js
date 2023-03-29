import logo from '../../../assets/images/logo/Logo.png'
import './ReceptionistChat.scss'

const ChatListItem = () => {
    return (
        <div className="card d-flex flex-row align-items-center mb-2">
            <div className='w-25'>
                <img className="card-img-top" src={logo} alt='...' />
            </div>
            <div className="card-body">
                <div className='row g-0'>
                    <div className='col-8'>
                        <h5 className="card-title">Username</h5>
                        <p className="card-text">Phone number</p>
                    </div>
                    <div className='col-4'>
                        <small>Time: </small>
                    </div>

                </div>
            </div>
        </div>
    );
}

const Message = (props) => {

    return (
        <>
            {props.position === 'left'
                ?
                <>
                    <div className=' left'>
                        <div className='avatar'></div>
                        <p className='text'>This is a left-aligned message.</p>
                        <p className='time'>9:00 AM</p>
                    </div>
                </>
                :
                <>
                    <div className=' right'>
                        <p className='time text-start'>9:05 AM</p>
                        <p className='text'>This is a right-aligned message. This is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned message   </p>
                        <div className='avatar mx-2'></div>
                    </div>

                </>
            }

        </>
    )
}


function ReceptionistChat() {
    return (
        <>
            <div className="receptionist-chat">
                <h1>Chat box</h1>
                <hr />
                <div className="container chat-box border shadow-sm" style={{ height: '85vh' }}>
                    <div className="row h-100 ">
                        <div className="col-4 p-2 border  h-100 overflow-auto">
                            <input className="form-control mb-2" type="text" name="search" placeholder="Search..." />
                            <div className="row row-cols-1 g-0">
                                <div className="col ">
                                    <ChatListItem />
                                    <ChatListItem />
                                    <ChatListItem />
                                    <ChatListItem />
                                    <ChatListItem />
                                    <ChatListItem />
                                    <ChatListItem />
                                </div>
                            </div>
                        </div>
                        <div className="col-8 p-2 border meassage-container">
                            <div className='meassage-container'>
                                <div className='message-box p-4'>
                                    <Message position='left'></Message>
                                    <Message position='left'></Message>
                                    <Message position='left'></Message>
                                    <Message position='right'></Message>
                                    <Message position='left'></Message>
                                    <Message position='left'></Message>


                                </div>
                                <div className="input-group ">
                                    <span className="btn btn-primary input-group-text" id="my-addon">Send</span>
                                    <input className="form-control" type="text" name="" placeholder="Recipient's text" aria-label="Recipient's text" aria-describedby="my-addon" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ReceptionistChat;