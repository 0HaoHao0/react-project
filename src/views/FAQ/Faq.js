import React, { Component } from 'react'
import '../../styles/views/Faq/Faq.scss'
class Faq extends Component {
	state = {}
	componentDidMount = () => {
		// $( '.friend-drawer--onhover' ).on( 'click',  function() {

		//     $( '.chat-bubble' ).hide('slow').show('slow');

		//   });
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
											<h6>Robo Cop</h6>
											<p className="text-muted">Layin' down the law since like before Christ...</p>
										</div>
									</div>
								</div>
							</div>
							<div className="chat-panel">
								<div className='chat-info'>
									<div className="row no-gutters">
										<div className="col-md-3">
											<div className="chat-bubble chat-bubble--left">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3 offset-md-9">
											<div className="chat-bubble chat-bubble--right">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3 offset-md-9">
											<div className="chat-bubble chat-bubble--right">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3">
											<div className="chat-bubble chat-bubble--left">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3">
											<div className="chat-bubble chat-bubble--left">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3">
											<div className="chat-bubble chat-bubble--left">
												Hello dude!
											</div>
										</div>
									</div>
									<div className="row no-gutters">
										<div className="col-md-3 offset-md-9">
											<div className="chat-bubble chat-bubble--right">
												Hello dude!
											</div>
										</div>
									</div>
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
														<input type="text" className='input-comment col-9' placeholder="Type your message here..." />
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

export default Faq;