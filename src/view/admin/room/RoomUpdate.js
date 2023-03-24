import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getRoomTypes, updateRoom } from "../../../services/admin/room/apiRoom";

function RoomUpdate() {
    let { state } = useLocation();
    const navigate = useNavigate()

    const [roomData, setRoomData] = useState(state || '');

    const [roomType, setRoomType] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ


    const loadRoomTypes = async () => {
        const res = await getRoomTypes();
        setRoomType(res.data)
    }

    useEffect(() => {
        loadRoomTypes();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleRoomSelect = (e) => {
        const roomTypeId = parseInt(e.target.value);
        setRoomData((prevState) => ({
            ...prevState,
            roomTypeId: roomTypeId
        }));
    };

    const handleCreateRoom = async () => {
        if (!dataError.roomCode && !dataError.roomTypeId && !dataError.description) {
            Swal.fire({
                title: 'Are You Sure ?',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'OK',
                focusCancel: true,
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Xử lý khi người dùng bấm OK
                    const res = await updateRoom(roomData);
                    if (res.status === 200) {
                        toast.success("Update Room Success")
                        navigate('/admin/room')
                    }
                    else {
                        toast.error("Update Room Fail !")
                    }
                } else {
                    // Xử lý khi người dùng bấm Cancel
                    toast.info("Update cancelled");
                }
            });

        }
        else {
            toast.error("Please Fill In All Input !")
        }
    }

    const validate = (e) => {
        const { name, value } = e.target;
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        if (value === '') {
            setDataError((prevState) => ({
                ...prevState,
                [name]: "Input Empty !"
            }));

        }
        else {
            setDataError((prevState) => ({
                ...prevState,
                [name]: ''
            }));

        }
    }

    return (<>
        <div className="room-update">
            <h1>Room Update</h1>
            <hr />
            <div className="container row">
                <div className="col-lg-6 col-sm-12 mb-3">
                    <label htmlFor="roomCode" className="form-label">Room Code: </label>

                    <input type="text" className={`form-control  ${isTouched.roomCode && (dataError.roomCode ? "is-invalid" : "is-valid")}`}
                        id="roomCode" name="roomCode" placeholder={roomData.roomCode} value={roomData.roomCode}
                        onBlur={validate} onChange={handleChange} />
                    {dataError.roomCode
                        ? <div class="invalid-feedback">
                            {dataError.roomCode}
                        </div>
                        : null}



                    <label htmlFor="roomType" className="form-label">Select Room: </label>
                    <select className={`form-control  ${isTouched.roomType && (dataError.roomType ? "is-invalid" : "is-valid")}`}
                        id="roomType" name="roomType"
                        onBlur={validate} onChange={handleRoomSelect}>
                        <option disabled value={roomData.roomType.id}>{roomData.roomType.name}</option>
                        {roomType.map(room => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                    </select>
                    {dataError.roomType
                        ? <div class="invalid-feedback">
                            {dataError.roomType}
                        </div>
                        : null}

                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                    <label htmlFor="description" className="form-label">Description: </label>
                    <textarea className={`form-control  ${isTouched.description && (dataError.description ? "is-invalid" : "is-valid")}`}
                        id="description" name="description" placeholder={roomData.description} value={roomData.description}
                        onBlur={validate} onChange={handleChange}></textarea>
                    {dataError.description
                        ? <div class="invalid-feedback">
                            {dataError.description}
                        </div>
                        : null}

                </div>
            </div>
            <button className="btn btn-primary" onClick={handleCreateRoom}>Update</button>
        </div>
    </>);
}

export default RoomUpdate;