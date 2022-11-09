import React, { Component } from 'react';
import '../../styles/views/Faq/RecFaq.scss';
import Pusher from 'pusher-js';
import { ChatGetMessage, ChatGetUserProfile, ChatGetUsers, ChatRectoPat } from '../../services/Receptionist/recChatApi';
import { connect } from 'react-redux';
import moment from 'moment/moment';



class RecFaq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userClick: null,
            userProfile: null,
            userMessageData: [],
            userMessages: null,
        };

        var pusher = new Pusher('a5612d1b04f944b457a3', {
            cluster: 'ap1'
        });

        this.channel = pusher.subscribe(this.props.user.pusherChannel);

        this.channel.bind_global((eventName, message) => {

            if (eventName === "Chat-PatToRec") {
                this.pushMessage(JSON.parse(message));
            }
        });

    }

    pushMessage = (message) => {
        this.setState(prevState => ({
            userMessageData: [message, ...prevState.userMessageData]
        }));
    }


    componentDidMount = async () => {
        await ChatGetUsers((response) => { this.setState({ data: response.data }) });
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevState.userMessageData !== this.state.userMessageData) {
            let chatHistory = document.getElementById('chat-history');
            if (chatHistory.scrollTop > 10) {
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }
        }
    }
    // Pick User
    handleUserChat = async (item) => {
        this.setState({ userClick: item })
        await ChatGetMessage(item.user.id, 1, (response) => { this.setState({ userMessages: response.data, userMessageData: response.data.data }) })

        await ChatGetUserProfile(this.state.userClick.user.id, (response) => { this.setState({ userProfile: response.data }) })

    }


    //
    scrollChat = (e) => {

        if (e.target.scrollTop === 0) {
            ChatGetMessage(this.state.userClick.user.id, this.state.userMessages.page + 1, (response) => {
                this.setState({
                    userMessages: response.data,
                    userMessageData: [...this.state.userMessageData, ...response.data.data]
                });
            })
        }

    }
    //Submit chat
    submitChat = (e) => {
        if (e.key === 'Enter') {
            ChatRectoPat(this.state.userClick.user.id, e.target.value, (response) => {
                this.setState(prevState => ({
                    userMessageData: [response.data, ...prevState.userMessageData]
                }))
            })

            e.target.value = null
        }

    }

    // Conver Date 
    convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj);

            return moment(date).format('DD/MM, h:mm A');;
        }
    }
    render() {
        return (<>
            <div className="rec-chat">
                <div className="container my-5">
                    {
                        this.state.userProfile !== null
                            ?
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title text-center">User Profile</h5>
                                    <hr />
                                    <h6 className="card-subtitle mb-2 text-muted text-center">Name: {this.state.userProfile.baseUser.fullName}</h6>
                                    <hr />
                                    <p className="card-text">
                                        <span className='fw-bold'> Address: </span>  {this.state.userProfile.baseUser.address}
                                    </p>
                                    <p className="card-text">
                                        <span className='fw-bold'> Birth Date: </span>   {this.state.userProfile.baseUser.birthDate.split('T')[0]}
                                    </p>
                                    <p className="card-text">
                                        <span className='fw-bold'>Email:  </span>   {this.state.userProfile.baseUser.email}
                                    </p>
                                    <p className="card-text">
                                        <span className='fw-bold'> Phone Number: </span>   {this.state.userProfile.baseUser.phoneNumber}
                                    </p>
                                    <p className="card-text">
                                        <span className='fw-bold'> Gender:  </span>  {this.state.userProfile.baseUser.gender}
                                    </p>
                                    <hr />
                                    <p className="card-text">
                                        <span className='fw-bold'> Medical Record:  </span> <a href={this.state.userProfile.medicalRecordFile.fileURL} rel="noreferrer" target='_blank'> link</a>
                                    </p>
                                    <p className="card-text">
                                        <span className='fw-bold'> Time Created:  </span> {this.state.userProfile.medicalRecordFile.timeCreated.split('T')[0]}
                                    </p>
                                </div>
                            </div>
                            :
                            null
                    }


                    <div className="row clearfix">
                        <div className="col-12 " >
                            <div className="card chat-app">
                                <div id="plist" className="people-list">
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                        <input type="text" className="form-control" placeholder="Search..." />
                                    </div>
                                    <ul className="list-unstyled chat-list mt-2 mb-0">
                                        {this.state.data.map((item, index) =>
                                            <li className="clearfix" key={index} onClick={() => this.handleUserChat(item)}>
                                                <img src={item.user.imageURL} alt="avatar" />
                                                <div className="about">
                                                    <div className="name">{item.user.fullName}</div>
                                                    <div className="status" > <i className="fa fa-circle online"></i> {this.convertDate(item.lastMessageCreated)} </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="chat">
                                    <div className="chat-header clearfix">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                {this.state.userClick !== null
                                                    ?
                                                    <>
                                                        <a href="." data-toggle="modal" data-target="#view_info">
                                                            <img src={this.state.userClick.user.imageURL} alt="avatar" />
                                                        </a>
                                                        <div className="chat-about">
                                                            <h6 className="m-b-0">{this.state.userClick.user.fullName}</h6>
                                                            <small>Last seen: {this.convertDate(this.state.userClick.lastMessageCreated)}</small>
                                                        </div>
                                                    </>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-history" onScroll={(e) => { this.scrollChat(e) }} id='chat-history' >
                                        <ul className="m-b-0">
                                            {this.state.userMessageData.reverse().map((item, index) =>
                                                item.fromUser.id === this.state.userClick.user.id
                                                    ?
                                                    <li className="clearfix" key={index}>
                                                        <div className="message-data">
                                                            <img src={this.state.userClick.user.imageURL} alt="avatar" />
                                                            <span className="message-data-time">{this.convertDate(item.timeCreated)}</span>
                                                        </div>
                                                        <div className="message my-message">{item.content}</div>
                                                    </li>
                                                    :
                                                    <li className="clearfix" key={index}>
                                                        <div className="message-data text-end">
                                                            <span className="message-data-time">{this.convertDate(item.timeCreated)}</span>
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                        </div>
                                                        <div className="message other-message float-end">{item.content}</div>
                                                    </li>
                                            )
                                            }



                                        </ul>
                                    </div>

                                    <div className="chat-message clearfix">
                                        <div className="input-group mb-0">
                                            <span className="input-group-text"><i className="fa-solid fa-paper-plane"></i></span>
                                            <input type="text" className="form-control" placeholder="Enter text here..." onKeyDown={(e) => { this.submitChat(e) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>);
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(RecFaq);