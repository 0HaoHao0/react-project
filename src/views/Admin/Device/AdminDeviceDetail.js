import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeviceGetId } from "../../../services/AdminApiConnection/adminDeviceApi";

function AdminDeviceDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [deviceDetail, setDeviceDetail] = useState([]);
    const [deviceRoom, setDeviceRoom] = useState([]);
    const [deviceService, setDeviceService] = useState([]);

    const fetchDeviceId = async (id) => {
        let response = await DeviceGetId(id);

        setDeviceDetail(response.data);
        setDeviceRoom(response.data.room);
        setDeviceService(response.data.services);
    }

    useEffect(() => {
        fetchDeviceId(param.id)
    }, [param.id]);

    //Back
    const handleBack = () => {
        navigate('/admin/device');
    }

    //Convert Date
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj).toISOString().split('T')[0]

            return date;
        }
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
                                    <label className="fw-bold"> Name :</label> {deviceDetail.deviceName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Value :</label> {deviceDetail.deviceValue}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Status :</label> {deviceDetail.status === true ? 'True' : 'Fasle'}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Date :</label> {convertDate(deviceDetail.date)}
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control bg-light" placeholder={deviceDetail.description} disabled />
                                </div>
                            </div>
                            <div className="col-12">
                                <label className="fw-bold"> Image: </label>
                                <div className="row">
                                    <div className="col-12 border p5">
                                        <div className="d-flex justify-content-center">
                                            <img src={deviceDetail.imageURL} width='50%' alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <h3>Room Infomation :</h3>
                            {
                                <div className="col-12 p-2">
                                    <div className="card">
                                        <div className="card-header"> <span className="fw-bold"> Room Id: </span>  {deviceRoom.id}</div>
                                        <div className="card-body text-primary">
                                            <span className="text-dark fw-bold"> Room Name:  </span> {deviceRoom.roomCode}
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                        <hr />
                        <div className="row">
                            <h3>Service Infomation :</h3>
                            {deviceService.map((item, index) =>
                                <div className="col-12 col-sm-6 col-md-4 p-2" key={index}>
                                    <div className="card">
                                        <div className="card-header"> <span className="fw-bold"> Service Id: </span>  {item.id}</div>
                                        <div className="card-body text-primary">
                                            <span className="text-dark fw-bold"> Service Name:  </span> {item.serviceCode}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

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