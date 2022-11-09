import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomGetId, RoomGetSelectRoomTypes, RoomUpdate } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminRoomUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [roomDetail, setRoomDetail] = useState([]);

    const [roomType, setRoomType] = useState([]);

    const [roomTypes, setRoomTypes] = useState([]);

    let roomData = {
        id: param.id,
        roomCode: null,
        description: null,
        roomType: null
    }


    const getData = async (id) => {
        let roomData = await RoomGetId(id);

        await RoomGetSelectRoomTypes((response) => setRoomTypes(response.data));

        setRoomDetail(roomData.data);
        setRoomType(roomData.data.roomType)
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        roomData.roomCode = roomDetail.roomCode
        roomData.description = roomDetail.description
        roomData.roomType = roomType.id
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
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
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
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room Type :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { roomData.roomType = parseInt(e.target.value) }}>
                                        <option defaultValue='' hidden>{roomType.name}</option>
                                        {
                                            roomTypes.map((item, index) =>
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold">Room Description :</label>
                                    <textarea type="text" rows={5} className="form-control " placeholder={roomDetail.description}
                                        onChange={(e) => { roomData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="my-4">
                            <button className="btn btn-success me-2" onClick={() => handleUpdate()}>Update</button>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoomUpdate