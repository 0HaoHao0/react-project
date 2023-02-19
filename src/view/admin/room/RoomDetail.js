import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteRoom } from "../../../services/admin/room/apiRoom";

function RoomDetail() {
    let { state } = useLocation();
    const navigate = useNavigate()


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
                await deleteRoom(state.id);
                toast.success("Delete Successful!");
                navigate("/admin/room");
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Delete cancelled");
            }
        });
    }
    return (<>
        <div className="room-detail">
            <div className="row">
                <h1>Room Detail</h1>
            </div>
            <hr />
            <div className="row">
                <div className="col-lg-6 col-xs-12">
                    <div className="mb-3">
                        <label htmlFor="roomId" className="form-label">ID</label>
                        <input type="text" className="form-control" id="roomId" value={state.id} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roomCode" className="form-label">Room Code</label>
                        <input type="text" className="form-control" id="roomCode" value={state.roomCode} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="3" value={state.description} readOnly></textarea>
                    </div>
                </div>
                <div className="col-lg-6 col-xs-12">

                    <div className="mb-3">
                        <label htmlFor="roomType" className="form-label">Room Type </label>
                        <input type="text" className="form-control" id="roomType" value={state.roomType.name} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="timeCreated" className="form-label">Time Created</label>
                        <input type="text" className="form-control" id="timeCreated" value={state.timeCreated} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastTimeModified" className="form-label">Last Time Modified</label>
                        <input type="text" className="form-control" id="lastTimeModified" value={state.lastTimeModified || "N/A"} readOnly />
                    </div>
                </div>

                <div className="col-12 border-top">
                    <div className="mb-3">
                        <label htmlFor="devices" className="form-label">Devices</label>
                        <input type="text" className="form-control" id="devices" value={state.devices.join(", ")} readOnly />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-6">
                    <Link to={'/admin/room/update'} state={state} className="btn btn-primary">Update</Link>

                </div>
                <div className="col-6">
                    <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>

                </div>
            </div>
        </div>
    </>);
}

export default RoomDetail;