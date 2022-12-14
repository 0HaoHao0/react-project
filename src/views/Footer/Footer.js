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
                <footer className="footer py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-3 mb-md-0 my-2">
                                <h2 className="footer-heading d-flex">
                                    <span className="icon d-flex align-items-center justify-content-center"><i className="fa-solid fa-house-user"></i></span>
                                    Home
                                </h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><i className="icon fa-solid fa-location-dot"></i><span className="text">Cầu Rau Răm, Đ. Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ 900000</span></li>
                                        <li><p href="." style={{ textDecoration: 'none' }}><i className="icon fa-solid fa-phone"></i><span className="text">+84 +++ +++ +++</span></p></li>
                                        <li><p href="." style={{ textDecoration: 'none' }}><i className="icon fa-sharp fa-sharps fa-solid fa-paper-plane"></i><span className="text">xxx@gmail.com</span></p></li>
                                    </ul>
                                </div>
                                <form action="#" className="subscribe-form row">
                                    <h2 className=''>Subcrises</h2>
                                    <div className="form-group d-flex">

                                        <input type="text" className="input-border form-control rounded-left" placeholder="Enter email address" />
                                        <button type="submit" className="form-control submit rounded-right mx-2"><span className="sr-only">Submit</span><i className="fa-sharp fa-sharpss fa-solid fa-paper-plane"></i></button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-12 col-lg-3 mb-md-0 my-2">
                                <h2 className="footer-heading d-flex align-items-center"><span className="icon d-flex align-items-center justify-content-center"><i className="fa-solid fa-syringe"></i></span>Our Service</h2>
                                <ul className="list-unstyled">
                                    <li><a href="." className="py-2 d-block h5" style={{ textDecoration: 'none' }}>Services 💉</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-lg-3 mb-md-0 my-2">
                                <h2 className="footer-heading d-flex align-items-center"><span className="icon d-flex align-items-center justify-content-center"><i className="fa-solid fa-regular fa-handshake"></i></span>About Us</h2>
                                <ul className="list-unstyled">
                                    <li><a href="." className="py-2 d-block h5 aloalo123" style={{ textDecoration: 'none' }}>Home 🏠</a></li>
                                    <li><a href="." className="py-2 d-block h5" style={{ textDecoration: 'none' }}>Contact 📱</a></li>
                                    <li><a href="." className="py-2 d-block h5" style={{ textDecoration: 'none' }}>About Us 🧑‍🤝‍🧑</a></li>
                                    <li><a href="." className="py-2 d-block h5" style={{ textDecoration: 'none' }}>Help &amp; Support ❓</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-lg-3 mb-md-0 my-2">
                                <h2 className="footer-heading d-flex align-items-center"><span className="icon d-flex align-items-center justify-content-center"><i className="fa-solid fa-question"></i></span>FAQs</h2>
                                <div className="block-24">
                                    <div className="row no-gutters">


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default Footer;