import React, { Component } from 'react';
import '../../styles/views/Home/MainStyle.scss'

import logo from '../../assets/images/Logo.png'
import { Link } from 'react-router-dom';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className='home-main'>
                    <div className='first-block d-flex align-items-center justify-content-center '>
                        <div className='px-5'>
                            <h1 className=''>👋 Welcome!!!</h1>
                            <p className='text-dark fw-bolder'>To using our services we highly recommend to login or register our website.</p>
                            <Link to="/login" className='btn btn-dark my-2 me-2'>Login</Link>
                            <Link to="/register" className='btn btn-light my-2'>Register</Link>
                            <p className='text-dark fw-bolder'>Or you need more infomation. Please scroll down ⬇️ </p>
                        </div>
                    </div>
                    <div className='second-block '>
                        <div className='container'>
                            <h1 className='py-5'>Our Purpose</h1>
                            <div className='row align-items-center justify-content-center' >
                                <div className='col-lg-4 col-sm-12 h-100 ' style={{ backgroundColor: "#65c7f7" }}>
                                    <div>
                                        <p className='m-4'>
                                            <span className=' text-light fw-bolder '>Shiny Teeth </span>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ipsam qui maxime blanditiis nulla, id cumque temporibus eum repellendus inventore quam fugit mollitia ab tempora tenetur assumenda voluptates? Animi, tenetur?
                                        </p>
                                    </div>
                                </div>
                                <div className='col-lg-8 col-xs-12 h-100 d-flex align-items-center justify-content-center' >
                                    <div>
                                        <img src={logo} alt="..." />
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

export default Main;