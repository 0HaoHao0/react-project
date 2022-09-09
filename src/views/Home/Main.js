import React, { Component } from 'react';
import '../../styles/views/Home/MainStyle.scss'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className='home-main'>
                    <div className='first-block d-flex align-items-center justify-content-center'>
                        <div className=''>
                            <h1 className=''>👋 Welcome!!!</h1>
                            <p className='text-dark fw-bolder'>To using our services we highly recommend to login or register our website.</p>
                            <button className='btn btn-dark my-2 me-2'>Login</button>
                            <button className='btn btn-light my-2'>Register</button>
                            <p className='text-dark fw-bolder'>Or you need more infomation. Please scroll down ⬇️ </p>
                        </div>
                    </div>
                    <div className='second-block'>
                        <div className='container'>
                            <h1 className='py-5'>Our Purpose</h1>
                            <div className='row'>
                                <div className='col-4' style={{ backgroundColor: "#65c7f7", height: "50vh" }}>

                                </div>
                                <div className='col-8'>

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