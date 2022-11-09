import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomCreate, RoomGetSelectRoomTypes } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminRoomCreate() {
    const navigate = useNavigate();

    const [roomTypes, setRoomTypes] = useState([])

    let roomData = {
        roomCode: null,
        description: null,
        roomType: null,
    }

    // Get room Type
    const getRoomTypes = async () => {
        await RoomGetSelectRoomTypes((response) => setRoomTypes(response.data));

    }

    useEffect(() => {
        getRoomTypes();
    }, [])

    //Create
    const handleCreate = async () => {
        let res = await RoomCreate(roomData);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/admin/room')
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
            <div className="admin-room-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Room Create
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room Code :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { roomData.roomCode = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room Type :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { roomData.roomType = parseInt(e.target.value) }}>
                                        <option defaultValue={null} hidden>Select room</option>
                                        {
                                            roomTypes.map((item, index) =>
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room description :</label>
                                    <textarea rows={5} type="text" className="form-control "
                                        onChange={(e) => { roomData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" my-4">
                            <button className="btn btn-success me-2" onClick={() => handleCreate()}>Create</button>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoomCreate;