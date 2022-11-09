import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ServiceGetId } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [serviceDetail, setServiceDetail] = useState([]);

    const [serviceDevices, setServiceDevices] = useState([]);

    const fetchServiceId = async (id) => {
        let response = await ServiceGetId(id);
        setServiceDetail(response.data);
        setServiceDevices(response.data.devices);
    }

    useEffect(() => {
        fetchServiceId(param.id)
    }, [param.id]);

    //Back
    const handleBack = () => {
        navigate('/admin/service');
    }


    return (
        <>
            <div className="admin-service-detail">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Service Detail {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Code :</label> {serviceDetail.serviceCode}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Name :</label> {serviceDetail.serviceName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Price :</label> {serviceDetail.price}
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control bg-light" placeholder={serviceDetail.description} disabled />
                                </div>
                            </div>
                            <div className="col-12">
                                <label className="fw-bold"> Image: </label>
                                <div className="row">
                                    <div className="col-12 p5">
                                        <div className="border d-flex justify-content-center">
                                            <img src={serviceDetail.imageURL} width='50%' alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <h3>Device Infomation :</h3>
                            {serviceDevices.map((item, index) =>
                                <div className="col-12 col-sm-6 col-md-4 p-2" key={index}>
                                    <div className="card">
                                        <div className="card-header"> <span className="fw-bold">Id: </span>  {item.id}</div>
                                        <div className="card-body text-primary">
                                            <span className="text-dark fw-bold"> Name:  </span> {item.name}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className=" my-4">
                            <Link to={`/admin/service/update/${param.id}`} className="btn btn-primary me-2" >Update</Link>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminServiceDetail;