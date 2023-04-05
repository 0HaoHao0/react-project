import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteRoom, getRoomDetail } from "../../../services/admin/room/apiRoom";
import { useEffect, useState } from "react";

function RoomDetail() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();
    const [roomInfo, setRoomInfo] = useState(state || {});

    useEffect(() => {

        getRoomDetail({
            id: id,
            callback: (res) => {
                if(res.status === 200) {
                    console.log("room detail: ", res.data);
                    setRoomInfo(res.data);
                }
            }
        })

    }, [id]);

    const handleDelete = () => {
        Swal.fire({
            title: 'Are You Sure ?',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'OK',
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng bấm OK
                await deleteRoom(roomInfo.id);
                toast.success("Delete Successful!");
                navigate("/admin/room");
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Delete cancelled");
            }
        });
    }

    return (<>
        <div className="room-detail p-5">
            <h1>Room Detail</h1>
            <hr />
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="mb-3">
                            <label htmlFor="roomId" className="form-label">ID</label>
                            <input type="text" className="form-control bg-white" id="roomId" value={roomInfo.id} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomCode" className="form-label">Room Code</label>
                            <input type="text" className="form-control bg-white" id="roomCode" value={roomInfo.roomCode} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control bg-white" id="description" rows="3" value={roomInfo.description} disabled></textarea>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">

                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">Room Category </label>
                            <input type="text" className="form-control bg-white" id="roomType" value={roomInfo.roomCategory.name} disabled />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">Room State </label>
                            <input type="text" className="form-control bg-white" id="roomType" value={roomInfo.roomType.name} disabled />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="timeCreated" className="form-label">Time Created</label>
                            <input type="text" className="form-control bg-white" id="timeCreated" value={new Date(roomInfo.timeCreated).toLocaleString()} disabled />
                        </div>
                    </div>



                </div>
                <div className="row">
                    <h4 className="alert alert-secondary">Device</h4>
                    {roomInfo.devices && roomInfo.devices.map((device) =>
                        <div className="col-4 mb-2">
                            <div class="card" >
                                <div class="card-body">
                                    <h5 >Id: {device.id}</h5>
                                    <p class="card-text">Device Name: {device.deviceName}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <div className="row">
                <div className="col-6">
                    <Link to={`/admin/room/update/${roomInfo.id}`} state={roomInfo} className="btn btn-primary">Update</Link>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>
                </div>
            </div>

        </div>
    </>);
}

export default RoomDetail;