import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomCreate } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminRoomCreate() {
    const navigate = useNavigate();

    let roomData = {
        roomCode: null,
        description: null
    }


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
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
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
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold">Room Description :</label>
                                    <textarea type="text" rows={10} className="form-control "
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
                                <button className="btn btn-success" onClick={() => handleCreate()}>Create</button>
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

export default AdminRoomCreate;