import { useEffect, useState } from 'react';
import { getServices } from '../../../services/UserApiConnection/userServiceApi';
import '../../../styles/views/User/Service/Service.scss'

function Service() {

    const [services, setServices] = useState([]);

    const getData = async () => {
        await getServices((res) => setServices(res.data))
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="service">
                <button className='btn  btn-take-appointment'><i className="fa fa-calendar-check"></i> Take Appointment</button>
                <div className="m-5">
                    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner ">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://www.anewdental.com/wp-content/uploads/2020/04/woman-at-dentist-min.jpg' height='50%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>A Better Life Starts With A Beautiful <span className='text-primary'>Smile </span> </h5>
                                    <p className='text-limit'>Modern destiny with unique technology and doctors of the highest category.</p>
                                </div>
                            </div>
                            <div className="carousel-item  " data-bs-interval="2000">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://nobledentalcare.com/site/assets/files/2699/male-dentist.1200x630.jpg' height='50%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>We Take Care Of Your <span className='text-primary'> Health </span> </h5>
                                    <p className='text-limit'>As a responsible and caring family dental clinic, we take pride in offering high-quality care and the latest dentistry services.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://ichef.bbci.co.uk/news/976/cpsprodpb/2291/production/_110894880_gettyimages-1055182908.jpg' height='50%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Your Best Dental Experience</h5>
                                    <p className='text-limit'>We'll do our best to deliver the best possible healthcare and customer service to you.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='bg-light'>
                    <div className='container my-5 p-5 '>
                        <h2>Best Services</h2>
                        <hr />
                        <div className="row">
                            {services.map((items, index) =>
                                index === 1
                                    ?
                                    <div className="col-12 col-lg-4">
                                        <div className='text-center'>
                                            <img className="bd-placeholder-img rounded-circle" src={items.imageURL} width="140" height="140" aria-label="Placeholder: 140x140" />
                                        </div>

                                        <h5>{items.serviceName}</h5>
                                        <p>{items.description}</p>
                                        <p><a className="btn btn-secondary" href=".">View details »</a></p>
                                    </div>
                                    : index === 4 ?
                                        <div className="col-12  col-lg-4">
                                            <div className='text-center'>

                                                <img className="bd-placeholder-img rounded-circle" src={items.imageURL} width="140" height="140" aria-label="Placeholder: 140x140" />
                                            </div>

                                            <h5>{items.serviceName}</h5>
                                            <p>{items.description}</p>
                                            <p><a className="btn btn-secondary" href=".">View details »</a></p>
                                        </div>
                                        : index === 5 ?
                                            <div className="col-12  col-lg-4">
                                                <div className='text-center'>

                                                    <img className="bd-placeholder-img rounded-circle" src={items.imageURL} width="140" height="140" aria-label="Placeholder: 140x140" />
                                                </div>

                                                <h5>{items.serviceName}</h5>
                                                <p>{items.description}</p>
                                                <p><a className="btn btn-secondary" href=".">View details »</a></p>
                                            </div>
                                            : null
                            )
                            }

                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-light'>
                        <h2 className='p-5'>Our Services</h2>
                    </div>
                    <div className="container  p-5">
                        {services.map((item, index) =>
                            index % 2
                                ?
                                <div key={index}>
                                    <div className="row service-odd p-5 ">
                                        <div className="col-md-7">
                                            <h2 className="featurette-heading">{item.serviceName}</h2>
                                            <p >{item.description}</p>
                                        </div>
                                        <div className="col-md-5">
                                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src={item.imageURL} width="400" height="400" aria-label="Placeholder: 500x500" ></img>

                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                :
                                <div key={index}>
                                    <div className="row service-even p-5">
                                        <div className="col-md-7 order-md-2">
                                            <h2 className="featurette-heading">{item.serviceName}</h2>
                                            <p >{item.description}</p>
                                        </div>
                                        <div className="col-md-5 order-md-1">
                                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src={item.imageURL} width="400" height="400" aria-label="Placeholder: 500x500" ></img>

                                        </div>
                                    </div>
                                    <hr />

                                </div>
                        )}






                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;