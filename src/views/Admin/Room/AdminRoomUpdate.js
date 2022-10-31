import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomGetId, RoomUpdate } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminRoomUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [roomDetail, setRoomDetail] = useState([]);


    let roomData = {
        id: param.id,
        roomCode: null,
        description: null
    }


    const fetchRoomId = async (id) => {
        let response = await RoomGetId(id);
        setRoomDetail(response.data);
    }

    useEffect(() => {
        fetchRoomId(param.id)
    }, [param.id]);


    useEffect(() => {
        roomData.roomCode = roomDetail.roomCode
        roomData.description = roomDetail.description
    },);


    //Update
    const handleUpdate = async () => {
        let res = await RoomUpdate(roomData);
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/room');
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/room');
    }
    return (
        <>
            <div className="admin-room-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Room Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room Code :</label>
                                    <input type="text" className="form-control" placeholder={roomDetail.roomCode}
                                        onChange={(e) => { roomData.roomCode = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold">Room Description :</label>
                                    <textarea type="text" rows={10} className="form-control " placeholder={roomDetail.description}
                                        onChange={(e) => { roomData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room Device :</label>
                                    <input type="text" className="form-control" disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
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

export default AdminRoomUpdate