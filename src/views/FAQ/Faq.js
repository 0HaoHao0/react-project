import React, { Component } from 'react'
import '../../styles/views/Faq/Faq.scss'
import $ from 'jquery';
class Faq extends Component {
    state = {  } 
  componentDidMount =() => {
    $( '.friend-drawer--onhover' ).on( 'click',  function() {
  
        $( '.chat-bubble' ).hide('slow').show('slow');
        
      });
  }
    render() { 
       
        return (
            <>
            <div className='faq'>
                <div className="container container-body-main">
	<div className="d-flex flex-wrap-reverse no-gutters">
	  <div className="col-md-4 border-right">
		<div className="settings-tray">
		  <img className="profile-image profile-circle" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img"/>
		  <span className="settings-tray--right">
          <i className="fa-solid fa-arrows-rotate"></i>
          <i className="fa-solid fa-message"></i>
          <i className="fa-solid fa-bars"></i>
		  </span>
		</div>
		<div className="search-box">
		  <div className="input-wrapper">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
			<input className='input-comment' placeholder="Search here" type="text"/>
		  </div>
		</div>
		<div className="friend-drawer friend-drawer--onhover">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt=""/>
		  <div className="text">
			<h6>Robo Cop</h6>
			<p className="text-muted">Hey, you're arrested!</p>
		  </div>
		  <span className="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div className="friend-drawer friend-drawer--onhover">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt=""/>
		  <div className="text">
			<h6>Optimus</h6>
			<p className="text-muted">Wanna grab a beer?</p>
		  </div>
		  <span className="time text-muted small">00:32</span>
		</div>
		<hr/>
		<div className="friend-drawer friend-drawer--onhover ">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" alt=""/>
		  <div className="text">
			<h6>Skynet</h6>
			<p className="text-muted">Seen that canned piece of s?</p>
		  </div>
		  <span className="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div className="friend-drawer friend-drawer--onhover">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg" alt=""/>
		  <div className="text">
			<h6>Termy</h6>
			<p className="text-muted">Im studying spanish...</p>
		  </div>
		  <span className="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div className="friend-drawer friend-drawer--onhover">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg" alt=""/>
		  <div className="text">
			<h6>Richard</h6>
			<p className="text-muted">I'm not sure...</p>
		  </div>
		  <span className="time text-muted small">13:21</span>
		</div>
		<hr/>
		<div className="friend-drawer friend-drawer--onhover">
		  <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg" alt=""/>
		  <div className="text">
			<h6>XXXXX</h6>
			<p className="text-muted">Hi, wanna see something?</p>
		  </div>
		  <span className="time text-muted small">13:21</span>
		</div>
	  </div>
	  <div className="col-md-8">
		<div className="settings-tray w-100">
			<div className="friend-drawer no-gutters friend-drawer--grey">
			<img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt=""/>
			<div className="text">
			  <h6>Robo Cop</h6>
			  <p className="text-muted">Layin' down the law since like before Christ...</p>
			</div>
			<span className="settings-tray--right">
            <i className="fa-solid fa-arrows-rotate"></i>
          <i className="fa-solid fa-message"></i>
          <i className="fa-solid fa-bars"></i>
			</span>
		  </div>
		</div>
		<div className="chat-panel">
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
		  <div className="row">
			<div className="col-12">
			  <div className="chat-box-tray">
              <i className="fa-regular fa-face-smile-beam"></i>
				<input type="text" className='input-comment' placeholder="Type your message here..."/>
				<i className="fa-solid fa-microphone"></i>
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