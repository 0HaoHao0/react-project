import { useNavigate } from 'react-router-dom';
import './Chat.scss'

const Message = (props) => {

    return (
        <>
            {props.position === 'left'
                ?
                <>
                    <div class=' left'>
                        <div class='avatar'></div>
                        <p class='text'>This is a left-aligned message.</p>
                        <p class='time'>9:00 AM</p>
                    </div>
                </>
                :
                <>
                    <div class=' right'>
                        <p class='time text-start'>9:05 AM</p>
                        <p class='text'>This is a right-aligned message. This is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned messageThis is a right-aligned message   </p>
                        <div class='avatar mx-2'></div>
                    </div>

                </>
            }

        </>
    )
}

function Chat() {
    const navigate = useNavigate();

    return (<>
        <div className="user-chat ">
            <button className="btn btn-danger btn-back" type="button" onClick={() => { navigate(-1) }}><i className="fa-solid fa-backward"></i> Back</button>

            <div className='box m-5 p-5  border shadow-sm' style={{ height: '90vh' }}>
                <h1>Chat With Reception</h1>
                <div className='meassage-container border' style={{ height: '70vh' }}>
                    <div class='message-box p-4'>
                        <Message position='left'></Message>
                        <Message position='left'></Message>
                        <Message position='left'></Message>
                        <Message position='right'></Message>
                        <Message position='left'></Message>
                        <Message position='left'></Message>
                        <Message position='right'></Message>
                        <Message position='left'></Message>
                        <Message position='left'></Message>
                        <Message position='right'></Message>
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
    </>);
}

export default Chat;