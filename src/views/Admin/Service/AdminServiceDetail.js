import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ServiceGetId } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [serviceDetail, setServiceDetail] = useState([]);

    const fetchServiceId = async (id) => {
        let response = await ServiceGetId(id);
        setServiceDetail(response.data);
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
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Service Detail {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Service Code :</label> {serviceDetail.serviceCode}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Service Price :</label> {serviceDetail.price}
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control bg-light" placeholder={serviceDetail.description} disabled />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row my-4">
                            <div className="col-6">
                                <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                            </div>
                            <div className="col-6">
                                <Link to={`/admin/service/update/${param.id}`} className="btn btn-primary" >Update</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminServiceDetail;