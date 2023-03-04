import { useEffect, useState } from 'react';
import { getAllService } from '../../services/admin/service/apiService';
import './Service.scss'
function Service() {
    const [services, setServices] = useState()

    const loadServices = async () => {
        const res = await getAllService(-1);
        if (res.status === 200) {
            setServices(res.data)
        }
    }

    useEffect(() => {
        loadServices();

        return () => {

        }
    }, [])


    return (<>
        <div className="service">
            {/* Cover Part */}
            <div className="cover-page d-flex align-items-center justify-content-center vh-100 ">
                <div className="w-75 text-box p-5">
                    <h1>“Your Great Smile Begins With A Great Dentist”</h1>
                    <br />
                    <h5 className='btn btn-warning fw-bold'>Discover Now</h5>
                </div>
            </div>

            <div className=' '>
                <h3 className='m-5 alert alert-dark '> Top Services</h3>
                <div className='row gx-5 mx-4'>

                    {services && services.slice(0, 5).map((service, index) =>
                        <div className='col py-5'>
                            <div className="card  h-100">

                                <img className="card-img-top border p-4" src={service.imageURL} alt="..." />
                                <div className="card-body ">
                                    <h5 className="card-title fw-bold"> {service.serviceName}</h5>
                                    <br />
                                    <p className="card-text">{service.description}</p>
                                    <button className='btn btn-warning'>Book Now <i className="fa-solid fa-calendar-days"></i></button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </>);
}

export default Service;