import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllService, getServicesRating } from '../../services/admin/service/apiService';
import './Service.scss'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
function Service() {
    const user = useSelector((state) => state.user.userInfo);

    const [services, setServices] = useState()

    const [serviceRating, setServiceRating] = useState()

    const [searchByName, setSearchByName] = useState()

    const ref = useRef(null);

    let debounce;


    const loadData = async () => {
        Swal.fire({
            title: "Loading...",
            html: "Please wait a moment"
        })
        Swal.showLoading()
        const resService = await getAllService(-1);
        const resServiceRating = await getServicesRating();
        Swal.close()

        if (resService.status === 200) {
            setServices(resService.data)
        }
        else {
            toast.error("Can not load services, please try again or contact to admin !!!")
        }

        if (resServiceRating.status === 200) {
            setServiceRating(resServiceRating.data)
        }
        else {
            toast.error("Can not load services rating, please try again or contact to admin !!!")
        }

    }


    useEffect(() => {

        loadData();


        return () => {
        }
    }, [])


    const handleSearch = (e) => {
        clearTimeout(debounce);

        debounce = setTimeout(() => {
            setSearchByName(e.target.value);
        }, 500);
    }

    const displayRating = (id) => {
        let point;
        serviceRating.forEach(element => {
            if (element.serviceInfo.id === id) {
                point = element.averagePoint
            }
        });
        return point
    }

    const displayTopService = () => {
        let top = [];
        serviceRating.slice(0, 2).forEach(element => {
            services.data.forEach(service => {
                if (service.id === element.serviceInfo.id) {
                    top.push(service)
                }
            });
        });
        return top;
    }

    return (<>
        <div className="service">
            {/* Cover Part */}
            <div className="cover-page d-flex align-items-center justify-content-center vh-100 ">
                <div className="w-75 text-box p-5">
                    <h1 className='fw-bold'>“Your Great Smile Begins With A Great Dentist”</h1>
                    <br />
                    <h5 className='btn btn-warning fw-bold' onClick={() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start', top: '-20px' }); }}>Discover Now</h5>
                </div>
            </div>

            <div className='second-page'>
                <div className='row g-5 m-5'>
                    <div className='col-lg-6 col-sm-12 p-5'>
                        <div className='h-100 d-flex flex-column justify-content-center'>
                            <h1 className='fw-bold my-4'>Love your general dental care</h1>
                            <p>
                                We’re thrilled to be your new home for exceptional dentistry. Visit us for a cleaning, general dental exam, and a bit of pampering. Plus, everything else you need to look and feel your best.
                            </p>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-12 '>
                        <div className=' alert alert-light w-100 d-inline-flex  align-items-center justify-content-between  '>
                            <h3 className='m-0'>
                                Top Services
                            </h3>
                            <button className="btn btn-primary " onClick={() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start', top: '-20px' }); }} type="button">See More</button>
                        </div>
                        <div className='row row-cols-sm-2 g-5 '>
                            {services && displayTopService().map((service, index) =>
                                <div className='col ' key={service.id}>
                                    <div className="card shadow  h-100" >
                                        <img className="card-img-top w-100" style={{ height: '250px' }} src={service.imageURL} alt="..." />
                                        <div className="card-body row g-2">
                                            <h5 className="card-title fw-bold  my-3"> {service.serviceName}</h5>
                                            <div className='col-lg-6 col-sm-12 border rounded-3   d-flex flex-column justify-content-center align-items-center'>
                                                <span>Rating Point</span>

                                                <span className='text-primary'>{displayRating(service.id)} / 5  <i className="fa fa-star fs-5x " ></i></span>
                                            </div>
                                            <div className='col-lg-6 col-sm-12  d-flex flex-column justify-content-between'>
                                                <Link to={'/services/info'} state={service} className='btn btn-primary mb-2'>Detail <i className="fa-solid fa-circle-info"></i></Link>
                                                <Link to={`${user ? '/user/booking' : '/login'}`} state={service} className='btn btn-warning '>Book Now <i className="fa-solid fa-calendar-days"></i></Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className='third-page'>
                <div className='row g-0 m-5'>
                    <div className="col-lg-6 col-sm-12 ">
                        <div className='d-flex justify-content-lg-start justify-content-center'>

                            <img className='w-75' src="https://www.villagedentaldtc.com/wp-content/uploads/2021/09/patient-forms-village-dental.jpg" alt="..." />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 p-5">
                        <div className='d-flex flex-column justify-content-center h-100'>
                            <h1 className='fw-bold'>Easy Automated Booking Online</h1>
                            <p>Use our booking system and complete your patient forms. Our average wait time is around 5 minutes — although, with all of the amenities in our system, you may wish to stay longer.</p>
                        </div>
                    </div>

                </div>
            </div>
            {/*  */}
            <div className='four-page ' ref={ref}>
                <div className='row g-0 mx-5 overflow-hidden'>
                    <div className="alert alert-light d-inline-flex flex-lg-row flex-column   align-items-center justify-content-between" role="alert">
                        <h1 className="alert-heading none   text-nowrap w-100">Our Services</h1>
                        <div className="input-group ">

                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder="Search by Service Name"

                                onChange={handleSearch}
                            />
                            <button className="btn btn-primary ">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-5" >
                    <div className='services-box row  overflow-auto border rounded-3  ' >
                        {

                            services && (searchByName ?
                                <>
                                    {
                                        services.data.filter(service => service.serviceName.toLowerCase().includes(searchByName.toLowerCase())).map((service, index) =>
                                            <div className='col-lg-4 col-md-12 d-flex align-items-center justify-content-center p-5' key={service.id}>
                                                <div className="card shadow  h-100 " style={{ width: '18rem' }} >
                                                    <img className="card-img-top w-100" style={{ height: '250px' }} src={service.imageURL} alt="..." />
                                                    <div className="card-body row g-2">
                                                        <h5 className="card-title fw-bold  my-3"> {service.serviceName}</h5>
                                                        <div className='col-lg-6 col-sm-12 border rounded-3   d-flex flex-column justify-content-center align-items-center'>
                                                            <span>Rating Point</span>

                                                            <span className='text-primary'>{displayRating(service.id)} / 5  <i className="fa fa-star fs-5x " ></i></span>
                                                        </div>
                                                        <div className='col-lg-6 col-sm-12  d-flex flex-column justify-content-between'>
                                                            <Link to={'/services/info'} state={service} className='btn btn-primary mb-2'>Detail <i className="fa-solid fa-circle-info"></i></Link>
                                                            <Link to={`${user ? '/user/booking' : '/login'}`} state={service} className='btn btn-warning '>Book Now <i className="fa-solid fa-calendar-days"></i></Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>)

                                    }

                                </>
                                :
                                <>
                                    {services.data.map((service, index) =>
                                        <div className='col-lg-4 col-md-12 d-flex align-items-center justify-content-center p-5' key={service.id}>
                                            <div className="card shadow  h-100 " style={{ width: '18rem' }} >
                                                <img className="card-img-top w-100" style={{ height: '250px' }} src={service.imageURL} alt="..." />
                                                <div className="card-body row g-2">
                                                    <h5 className="card-title fw-bold  my-3"> {service.serviceName}</h5>
                                                    <div className='col-lg-6 col-sm-12 border rounded-3   d-flex flex-column justify-content-center align-items-center'>
                                                        <span>Rating Point</span>

                                                        <span className='text-primary'>{displayRating(service.id)} / 5  <i className="fa fa-star fs-5x " ></i></span>
                                                    </div>
                                                    <div className='col-lg-6 col-sm-12  d-flex flex-column justify-content-between'>
                                                        <Link to={'/services/info'} state={service} className='btn btn-primary mb-2'>Detail <i className="fa-solid fa-circle-info"></i></Link>
                                                        <Link to={`${user ? '/user/booking' : '/login'}`} state={service} className='btn btn-warning '>Book Now <i className="fa-solid fa-calendar-days"></i></Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    )}
                                </>)
                        }
                    </div>
                </div>

            </div>

            {/*  */}
            <div className='five-page'>
                <div className='row g-0 m-5 bg-dark  text-white'>
                    <h1 className='fw-bold text-center my-5'>It’s all in the details</h1>
                    <div className='row text-center p-5'>
                        <div className="col-lg-3 col-sm-12">
                            <i className="fa-solid fa-5x fa-money-check-dollar"></i>
                            <h3>

                                Transparent pricing
                            </h3>
                            At Village Dental, the cost of general dentistry treatment is transparent and affordable.
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <i className="fa-solid fa-5x fa-mug-hot"></i>
                            <h3>

                                A Dental Spa
                            </h3>
                            Essential oils, a warm compress — time to relax and have some fun.
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <i className="fa-solid fa-5x fa-computer"></i>
                            <h3>

                                State-of-the-art tech
                            </h3>
                            Comfortable x-rays done in seconds! Provides better diagnosis for more personalized care.
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <i className="fa-solid fa-5x fa-child"></i>
                            <h3>

                                Kids are cool
                            </h3>
                            We love our tiny toothbrush warriors! They’ll love our kid-friendly amenities.
                        </div>

                    </div>
                </div>

            </div>
            {/*  */}
            <div className="row p-5 m-5 align-items-center rounded-3  shadow">
                <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h1 className='fw-bold'>Visit Us</h1>
                    <p className="lead">We’re conveniently located in the Can Tho Center area. Find us on the 4th floor of the Office Park building. Plenty of free parking available.</p>
                    <h6>
                        <i className="fa-solid fa-location-dot"></i> 5670 Greenwood Plaza Blvd., Suite 404 Greenwood Village, CO 80111
                    </h6>
                    <h6>
                        <i className="fa-solid fa-clock"></i> Monday–Thursday: 9AM–5PM
                    </h6>
                    <br />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <Link to={'/contact'} className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Contact Us</Link>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow">
                    <img className="rounded-lg-3 w-100" src="https://www.villagedentaldtc.com/wp-content/uploads/2021/08/blue-waiting-room-chairs-village-dental-test.jpg" alt="" width="720" />
                </div>
            </div>
        </div>
    </>);
}

export default Service;