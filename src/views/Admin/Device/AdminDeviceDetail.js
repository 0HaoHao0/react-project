import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeviceGetId } from "../../../services/AdminApiConnection/adminDeviceApi";

function AdminDeviceDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [deviceDetail, setDeviceDetail] = useState([]);

    const fetchDeviceId = async (id) => {
        let response = await DeviceGetId(id);
        setDeviceDetail(response.data);
    }

    useEffect(() => {
        fetchDeviceId(param.id)
    }, [param.id]);

    //Back
    const handleBack = () => {
        navigate('/admin/device');
    }


    return (
        <>
            <div className="admin-device-detail">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Device Detail {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Device Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Device Name :</label> {deviceDetail.deviceName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Device Value :</label> {deviceDetail.deviceValue}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Device Status :</label> {deviceDetail.status}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Room:</label> {deviceDetail.roomId}
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control bg-light" placeholder={deviceDetail.description} disabled />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <h3>Service Infomation :</h3>
                            <div className="col-12">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Services :</label>
                                    <input type="text" className="form-control bg-light" placeholder={deviceDetail.deviceNames} disabled />
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="row my-4">
                            <div className="col-6">
                                <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                            </div>
                            <div className="col-6">
                                <Link to={`/admin/device/update/${param.id}`} className="btn btn-primary" >Update</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDeviceDetail;