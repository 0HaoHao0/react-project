import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { createRoom, getDevices, getRoomTypes } from "../../../services/admin/room/apiRoom";


function RoomCreate() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState("");

  const [roomType, setRoomType] = useState([]);


  const [dataError, setDataError] = useState("");

  const [isTouched, setIsTouched] = useState(""); // biến cờ

  const loadRoomTypes = async () => {
    const resRoomTypes = await getRoomTypes();


    setRoomType(resRoomTypes.data);
  };

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
    const roomType = parseInt(e.target.value);
    setRoomData((prevState) => ({
      ...prevState,
      roomType: roomType
    }));
  };



  const handleCreateRoom = async () => {
    if (!roomData.roomCode || (roomData.roomType !== 0 && roomData.roomType !== 1) || !roomData.description) {
      toast.error("Please Fill In All Input !")
    }
    else {

      Swal.fire({
        title: "Loading...",
        html: "Please wait a moment"
      })
      Swal.showLoading()
      const res = await createRoom(roomData);

      Swal.close()
      if (res.status === 200) {
        toast.success("Create Room Success")
        navigate('/admin/room')
      }
      else {
        toast.error("Create Room Fail !")
      }
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
    <div className="room-create p-5">


      <h1>Room Create</h1>
      <hr />
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-6 col-sm-12 mb-3">
            <label htmlFor="roomCode" className="form-label">Room Code: </label>
            <input type="text" className={`form-control  ${isTouched.roomCode && (dataError.roomCode ? "is-invalid" : "is-valid")}`}
              id="roomCode" name="roomCode" placeholder="R001 - (Room 001)"
              onBlur={validate} onChange={handleChange} />
            {dataError.roomCode
              ? <div className="invalid-feedback">
                {dataError.roomCode}
              </div>
              : null}



            <label htmlFor="roomType" className="form-label">Select Room: </label>
            <select className={`form-control  ${isTouched.roomType && (dataError.roomType ? "is-invalid" : "is-valid")}`}
              id="roomType" name="roomType"
              onBlur={validate} onChange={handleRoomSelect}>
              <option value="">-- Select Room --</option>
              {roomType.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
            {dataError.roomType
              ? <div className="invalid-feedback">
                {dataError.roomType}
              </div>
              : null}

          </div>
          <div className="col-lg-6 col-sm-12 mb-3">
            <label htmlFor="description" className="form-label">Description: </label>
            <textarea className={`form-control  ${isTouched.description && (dataError.description ? "is-invalid" : "is-valid")}`}
              id="description" name="description" placeholder="Room for ..."
              onBlur={validate} onChange={handleChange}></textarea>
            {dataError.description
              ? <div className="invalid-feedback">
                {dataError.description}
              </div>
              : null}

          </div>
        </div>

      </div>

      <button className="btn btn-success my-2" onClick={handleCreateRoom}>Create</button>

    </div>
  </>
  );
}

export default RoomCreate;
