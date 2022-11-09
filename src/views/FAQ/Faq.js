import React, { Component } from 'react'
import '../../styles/views/Faq/Faq.scss'
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { ChatGetMessage, ChatPattoRec } from '../../services/UserApiConnection/userChatApi';


class Faq extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userMessageData: [],
			userMessages: null,
		};

		var pusher = new Pusher('a5612d1b04f944b457a3', {
			cluster: 'ap1'
		});

		this.channel = pusher.subscribe(this.props.user.pusherChannel);

		this.channel.bind_global((eventName, message) => {

			if (eventName === "Chat-RecToPat") {
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

		ChatGetMessage(1, (response) => {
			this.setState({
				userMessageData: response.data.data,
				userMessages: response.data
			})
		})
	}
	componentDidUpdate(prevProps, prevState) {

		if (prevState.userMessageData !== this.state.userMessageData) {
			let chatHistory = document.getElementById('chat-history');
			if (chatHistory.scrollTop > 10) {
				chatHistory.scrollTop = chatHistory.scrollHeight;
			}
		}
	}

	//Submit chat
	submitChat = (e) => {
		if (e.key === 'Enter') {
			ChatPattoRec(e.target.value, (response) => {
				this.setState(prevState => ({
					userMessageData: [response.data, ...prevState.userMessageData]
				}))
			})

			e.target.value = null
		}

	}

	//
	scrollChat = (e) => {

		if (e.target.scrollTop === 0) {
			ChatGetMessage(this.state.userMessages.page + 1, (response) => {
				this.setState({
					userMessages: response.data,
					userMessageData: [...this.state.userMessageData, ...response.data.data]
				});
			})
		}

	}
	render() {

		return (
			<>

				<div className='faq'>
					<div className="container container-body-main">
						<div className="col-md-12">
							<div className="settings-tray w-100">
								<div className="row">
									<div className='col-12'>
										<img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
										<div className="text">
											<h6>Receptionist</h6>
											<p className="text-muted">You can ask your questions here!</p>
										</div>
									</div>
								</div>
							</div>
							<div className="chat-panel">
								<div className='chat-info' onScroll={(e) => { this.scrollChat(e) }} id='chat-history' >
									{
										this.state.userMessageData.reverse().map((item, index) =>
											this.props.user.id !== item.fromUser.id
												?
												<div className="row no-gutters" key={index}>
													<div className="col-md-3">
														<h6 className='m-2'>Receptionist:</h6>
														<div className="chat-bubble chat-bubble--left">
															{item.content}
														</div>
													</div>
												</div>
												:

												<div className="row no-gutters" key={index}>
													<div className="col-md-3 offset-md-9">
														<div className="chat-bubble chat-bubble--right">
															{item.content}
														</div>
													</div>
												</div>
										)
									}


								</div>
								<div className="row">
									<div className="col-12">
										<div className="chat-box-tray">
											<div className='col-9 '>
												<div className='row'>
													<div className='col-3 text-center'>
														<i className="fa-regular fa-face-smile-beam col-3"></i>
													</div>
													<div className='col-9'>
														<input type="text" className='input-comment col-9' placeholder="Type your message here..." onKeyDown={(e) => { this.submitChat(e) }} />
													</div>
												</div>
											</div>
											<div className='col-3 text-center'>
												<i className="fa-solid fa-paper-plane"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});


export default connect(mapStateToProps)(Faq);