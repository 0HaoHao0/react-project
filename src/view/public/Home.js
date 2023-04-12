import './Home.scss'
import logo from '../../assets/images/logo/Logo-nbg-lg.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllNews } from '../../services/admin/news/apiNew';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()

    const [news, setNews] = useState();

    const loadNews = async () => {

        const res = await getAllNews({
            params: {
                page: 1,
                pageSize: 10
            }
        })

        if (res.status === 200) {
            setNews(res.data.data)
        }
        else {
            toast.error("Can not load News, Please contact to Admin !")
        }
    }

    useEffect(() => {
        loadNews()
        return () => {

        }
    }, [])


    return (<>
        <div className='home'>
            {/* Slide show */}
            <div className='header-show'>
                <div className='d-flex align-items-center vh-100 '>
                    <div className='px-5'>
                        <div className='text-box p-5'>

                            <h5 >TRUSTED DENVER TECH CENTER DENTISTS</h5>
                            <h1 className=" fw-bold">
                                Exceptional care
                                for all ages
                            </h1>
                            <br />
                            <button className='btn btn-warning fw-bold' onClick={() => { navigate('/services') }}>Book Online</button>

                        </div>
                    </div>
                </div>
            </div>
            {/* Second path */}
            <div className="p-5  bg-light rounded-3">
                <div className='row'>

                    <div className="col-lg-8 col-sm-12 py-5">
                        <h1 className=" fw-bold">Dentistry Done Right</h1>
                        <p className=" fs-4">Adults and kids, we welcome patients of all ages! Our team is passionate about building lifetime relationships through positive experiences, featuring:</p>
                        <div className='ms-5'>

                            <p className='border-start border-warning ps-2'>+ Transparent Pricing</p>
                            <p className='border-start border-warning ps-2'>+ Unparalleled Warranty</p>
                            <p className='border-start border-warning ps-2'>+ Dedicated Care</p>
                        </div>
                        <p className='border-start border-warning fw-bold ps-2'> “Our word is our worth. We promise to do it right, timely, and for a fair price.”</p>
                    </div>
                    <div className='col-lg-4 col-sm-12 d-flex align-items-center justify-content-center '>
                        <img className='w-100 shadow' src="https://www.mouthhealthy.org/-/media/project/ada-organization/ada/mouthhealthy/images/femaledentist_1110x700.jpg?rev=4f53ea8f24ab4313a1b4fc9ac8a5b132&w=1306&hash=3CF43309A893D8DC64CC8331739F7A14" alt="" />
                    </div>
                </div>
            </div>
            {/* News */}
            <div className=''>
                <div className='row shadow p-5 m-5'>
                    <div className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center">
                        <img className='w-50' src={logo} alt="..." />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <h1 className='fw-bold text-start'>News:</h1>
                        <div>
                            {news ?
                                <>
                                    <div>
                                        {news.slice(-5).reverse().map((value, index) =>
                                            <div key={index} className='border rounded-2 shadow-sm p-2 mb-1'>
                                                <p className='mx-2 mb-0 fw-bold'>{value.publishDate.split("T")[0]}</p>
                                                <i className="fa-solid fa-cloud mx-2">:</i>
                                                <Link className='text-decoration-none' to={'/news'} state={value} >{value.title}</Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                                :
                                <>
                                    <div className='d-flex align-items-center justify-content-center h-100 '>
                                        Loading...
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Third path */}
            <div className="row g-0">
                <div className='row p-5'>
                    <div className='col'>
                        <img src="https://www.villagedentaldtc.com/wp-content/uploads/2021/08/noun_Quotation-Marks_479904.svg" alt="..." />
                        <br />
                        <h1 className='fw-bold'>

                            Kind words from our patients
                        </h1>

                    </div>
                    <div>
                        <p className='border-bottom'>
                            1,000 + 5-star reviews!
                        </p>
                    </div>
                </div>
                <div className='row p-5'>
                    <div className="col-lg-6 col-md-12 mt-5">
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='customer-comment-2 d-flex align-items-center'>
                                <div className='text-white p-5'>

                                    <h2>— Sherryll K.</h2>
                                    <hr />
                                    <p>
                                        <strong>

                                            Unlike other Can Tho dentists, Shiny Teeth Dental takes you where you’re at rather than chastising or shaming. I can’t recommend them highly enough. You will be well cared for!
                                        </strong>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 mt-5">
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='customer-comment-2 d-flex align-items-center'>
                                <div className='text-white p-5'>
                                    <h2 >— Lisa J.</h2>
                                    <hr />
                                    <p>
                                        <strong>

                                            It’s a pleasure to go to the dentist at Shiny Teeth Dental. The office is gorgeous, feels peaceful & clean. The staff has an upbeat attitude. Dr. Zervas is so kind & genuine.
                                        </strong>
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <div className=" d-flex align-items-center justify-content-center " >
                            <div className='customer-comment-3 d-flex align-items-center'>
                                <div className='text-white p-5'>
                                    <h2 >— JoAnn B.</h2>
                                    <hr />
                                    <p>
                                        <strong>

                                            Everything about this office is excellent! The staff is friendly and attentive. The assistants make you feel comfortable. Probably the best dentist I have ever seen. Wonderful place! Wonderful staff! Wonderful doctors!
                                        </strong>
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>
            {/* End */}
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
                        <Link to={'contact'} className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Contact Us</Link>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow">
                    <img className="rounded-lg-3 w-100" src="https://www.villagedentaldtc.com/wp-content/uploads/2021/08/blue-waiting-room-chairs-village-dental-test.jpg" alt="" width="720" />
                </div>
            </div>
        </div>

    </>);
}

export default Home;