import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ServiceGetId, ServiceUpdate } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [serviceDetail, setServiceDetail] = useState([]);


    let serviceData = {
        id: param.id,
        serviceCode: null,
        description: null,
        price: null,
    }


    // Get 

    const getData = async (id, page) => {
        let service = await ServiceGetId(id);
        setServiceDetail(service.data);
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        serviceData.serviceCode = serviceDetail.serviceCode
        serviceData.description = serviceDetail.description
        serviceData.price = serviceDetail.price
    },);


    //Update
    const handleUpdate = async () => {
        let res = await ServiceUpdate(serviceData);
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/service');
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/service');
    }
    return (
        <>
            <div className="admin-service-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Service Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Service Code :</label>
                                    <input type="text" className="form-control" placeholder={serviceDetail.serviceCode}
                                        onChange={(e) => { serviceData.serviceCode = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Service Price :</label>
                                    <input type="text" className="form-control" placeholder={serviceDetail.price}
                                        onChange={(e) => { serviceData.price = e.target.value }}
                                    />

                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control" placeholder={serviceDetail.description}
                                        onChange={(e) => { serviceData.description = e.target.value }} />
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-success" onClick={() => handleUpdate()}>Update</button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminServiceUpdate