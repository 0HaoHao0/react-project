import { Link, useLocation } from "react-router-dom";
import "./ServiceInfo.scss"



function ServiceInfo() {
    const { state } = useLocation();
    return (<>
        <div className="service-info p-5">
            <div className="">
                <Link to={`/user/booking`} state={state} className="btn btn-warning booking-btn" type="button">Booking Now <i className="fa-solid fa-calendar-days"></i></Link>
            </div>
            <div className="my-5 text-center">
                <h1 >{state.serviceName}</h1>
                <p ><strong> Service Code: </strong>  {state.serviceCode} <strong>Price:</strong> {state.price} VNĐ</p>
            </div>
            <div className="ckeditor ">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: state.description }}></div>
            </div>
        </div>
    </>);
}

export default ServiceInfo;