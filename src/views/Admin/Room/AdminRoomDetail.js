import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoomGetId } from "../../../services/AdminApiConnection/adminRoomApi";

import '../../../styles/views/Admin/Room/AdminRoomStyle.scss'

function AdminRoomDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [roomDetail, setRoomDetail] = useState([]);

    const [roomType, setRoomType] = useState([]);

    const [roomDevices, setRoomDevices] = useState([]);

    const fetchRoomId = async (id) => {
        let response = await RoomGetId(id);

        setRoomDetail(response.data);

        setRoomType(response.data.roomType)

        setRoomDevices(response.data.devices)
    }

    useEffect(() => {
        fetchRoomId(param.id)
    }, [param.id]);

    useEffect(() => {
    })

    //Back
    const handleBack = () => {
        navigate('/admin/room');
    }


    return (
        <>
            <div className="admin-room-detail">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Room Detail {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <h3>Room Infomation :</h3>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Code :</label> {roomDetail.roomCode}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Type :</label> {roomType.name}
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <h3>Room Status :</h3>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <input type="text" className="form-control bg-light" placeholder={roomDetail.description} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Room Device :</h3>
                            {roomDevices.map((item, index) =>
                                <div className="col-12 col-md-6 p-2">
                                    <div className="card card-device" key={index}>
                                        <div className="card-header"> <span className="fw-bold"> Device Id: </span>  {item.id}</div>
                                        <div className="card-body text-primary">
                                            <span className="text-dark fw-bold"> Device Name:  </span> {item.deviceName}
                                        </div>
                                    </div>
                                </div>

                            )}

                        </div>
                        <div className=" my-4">
                            <Link to={`/admin/room/update/${param.id}`} className="btn btn-primary me-2" >Update</Link>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoomDetail;