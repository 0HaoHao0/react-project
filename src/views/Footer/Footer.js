import React, { Component } from 'react';
import '../../styles/views/Footer/Footer.scss'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className='footer py-2'>
                    <div className=' container py-2'>
                        <div className='row'>
                            <div className='col-lg-4 col-sm-12 text-center p-4' style={{ backgroundColor: 'lightgray' }}>
                                <i className="fa-solid fa-phone"></i>
                                <p>+84 945xxxxxx</p>
                            </div>
                            <div className='col-lg-4 col-sm-12 text-center p-4'>
                                <i className="fa-solid fa-envelope"></i>
                                <p>xxx@fpt.edu.vn</p>
                            </div>
                            <div className='col-lg-4 col-sm-12 text-center p-4' style={{ backgroundColor: 'lightgray' }}>
                                <i className="fa-solid fa-location-dot"></i>
                                <p>Cầu Rau Răm, Đ. Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ 900000</p>
                            </div>
                        </div>
                    </div>
                    <div className='container py-2 '>
                        <div className='row'>
                            <div className='col-lg-6 col-sm-12 border-end'>
                                <div className='row'>
                                    <div className='col-3 p-2'>  <p className='font-monospace fw-blod'>Home</p> </div>
                                    <div className='col-3 p-2'>  <p className='font-monospace fw-blod'>Our Service</p> </div>
                                    <div className='col-3 p-2'>  <p className='font-monospace fw-blod'>About Us</p> </div>
                                    <div className='col-3 p-2'>  <p className='font-monospace fw-blod'>FAQs</p> </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-sm-12'>
                                <p className='font-monospace fw-blod'>Subcrises:</p>
                                <div className='row'>
                                    <div className='col-8'>
                                        <input type="text" className='form-control' />
                                    </div>
                                    <div className='col-4'>
                                        <button className='btn btn-primary'>Subcrises</button>
                                    </div>
                                </div>
                                <p className='text-muted'>Follow our new updates in your mail box</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='container '>
                        <div>
                            <h5 className='text-muted'>Copyright @2022 All rights reserved. This web is made by Group 1 SE1503</h5>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;