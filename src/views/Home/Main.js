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
                            {
                                this.props.user.id === null
                                    ?
                                    <>
                                        <div className='welcome-background p-5'>
                                            <h1 className='text-dark'>Take The <span className='text-info'> World's </span>  Best Quality Treatment</h1>
                                            <div className='row d-flex align-items-center'>
                                                <div className='col-12 col-md-3'>
                                                    <span className='text-dark fw-bolder'>To using our services</span>
                                                </div>
                                                <div className='col-12 col-md-9'>

                                                    <Link to="/login" className='btn btn-dark my-2 me-2'>Login</Link>
                                                    <Link to="/register" className='btn btn-outline-dark my-2'>Register</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='text-dark fw-bolder'>Or scroll down for more infomation. </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='welcome-background p-5'>
                                            <h1 className='text-dark'><span className='text-info'> Welcome </span>,  We wish you have a nice day</h1>
                                            <div className='row d-flex align-items-center'>
                                                <div className='col-12 col-md-6'>
                                                    <span className='text-dark fw-bolder'>Learning more about our services now, </span>
                                                </div>
                                                <div className='col-12 col-md-6'>

                                                    <Link to="/service" className='btn btn-info text-white my-2 me-2'>Services</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }

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
                    <div className="third-block ">
                        <div className="container py-5">
                            <div className="row h-100 align-items-center py-5">
                                <div className="col-lg-6">
                                    <h1 className="display-4">Always Smile</h1>
                                    <p className="lead text-muted mb-0">Experience Implant that is strong as your own teeth</p>
                                    <p className="lead text-muted">In any case, we give you the amazing the results
                                    </p>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className='d-flex justify-content-center'>

                                                    <img src="https://www.capturelifedentalcare.com/wp-content/uploads/2022/02/Best-Dental-Care-Clinic-Hyderabad-Has-With-Great-Services.jpg" height='300px' className="d-block w-75" alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item  ">
                                                <div className='d-flex justify-content-center'>

                                                    <img src="https://www.dentistrytoday.com/wp-content/uploads/2017/08/0030753daf42cd1252bf6eec34cd6272.jpg" height='300px' className="d-block w-75 " alt="..." />
                                                </div>
                                            </div>
                                            <div className="carousel-item  ">
                                                <div className='d-flex justify-content-center'>

                                                    <img src="https://portmanpdc.imgix.net/_panelImage/Consult-dentist-patient_200930_090048.jpg?mtime=20200930090048&auto=compress,format" height='300px' className="d-block w-75" alt="..." />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="four-block ">
                        <div className="container py-5">
                            <div className="row align-items-center mb-5">
                                <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                                    <h3 className="font-weight-light">We Provide Best Dental Care Solution For You</h3>
                                    <p className="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://www.dentistrytoday.com/wp-content/uploads/2020/04/194df8014cc7359d17897937cd25ec68.jpg" alt="" className="img-fluid mb-4 mb-lg-0 img-middle" /></div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-5 px-5 mx-auto"><img src="https://jacksonfamilydentalonline.com/wp-content/uploads/2020/05/jackson-team-jackson-family-dental.jpg" alt="" className="img-fluid mb-4 mb-lg-0 img-middle" /></div>
                                <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                                    <h2 className="font-weight-light">Schedule your first visit</h2>
                                    <p className="font-italic text-muted mb-4">As a fee-for-service practice, we offer easy payment plans and financing options to fit your family’s budget. We’re also happy to submit insurance claims on your behalf.</p>
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