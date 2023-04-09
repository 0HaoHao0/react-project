import { Link, useLocation } from "react-router-dom";
import "./ServiceInfo.scss"
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getServiceById } from "../../services/public/apiService";



function ServiceInfo() {
    const { state } = useLocation();
    const [service, setService] = useState()

    useEffect(() => {
        const loadData = async () => {
            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading()
            const resService = await getServiceById(state.id);
            Swal.close()

            if (resService.status === 200) {
                setService(resService.data)
            }
            else {
                toast.error("Can not load services, please try again or contact to admin !!!")
            }
        }
        loadData();


        return () => {
        }
    }, [state.id])


    return (<>
        {service &&
            <div className="service-info p-5">
                <div className="">
                    <Link to={`/user/booking`} state={service} className="btn btn-warning booking-btn" type="button">Booking Now <i className="fa-solid fa-calendar-days"></i></Link>
                </div>
                <div className="my-5 text-center">
                    <h1 >{service.serviceName}</h1>

                    <strong> Service Code: </strong>  {service.serviceCode}
                    <br />
                    <strong>Price:</strong> {service.price} VNĐ
                </div>

                <div className="ckeditor border p-5 rounded-3">
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: service.description }}></div>
                </div>
            </div>
        }

    </>);
}

export default ServiceInfo;