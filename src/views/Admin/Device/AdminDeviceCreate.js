import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceCreate } from "../../../services/AdminApiConnection/adminDeviceApi";
import { RoomGetAll } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminDeviceCreate() {
    const navigate = useNavigate();

    const [roomArray, setRoomArray] = useState([])

    let deviceData = {
        deviceValue: null,
        deviceName: null,
        description: null,
        status: null,
        roomId: null,
    }


    const featchRoom = async (page) => {
        let res = await RoomGetAll(page);
        console.log(res.data.data);
        setRoomArray(res.data.data)
    }


    useEffect(() => {
        featchRoom();
    }, [])



    //Create
    const handleCreate = async () => {
        console.log(deviceData);
        let res = await DeviceCreate(deviceData);
        if (res.status === 200) {
            toast.success("Create Success");
            setTimeout(() => { navigate('/admin/device'); }, 1000)
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/device');
    }

    return (
        <>
            <div className="admin-device-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Device Create
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Device Infomation</h3>
                            <div className="col-12 col-md-6">

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Device Name :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { deviceData.deviceName = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Device Value :</label>
                                    <input type="number" className="form-control "
                                        onChange={(e) => { deviceData.deviceValue = parseInt(e.target.value) }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Device Status :</label>
                                    <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => { e.target.value === 0 ? deviceData.status = true : deviceData.status = false }}>
                                        <option defaultValue={null}>Select device status</option>
                                        <option value={0}>True</option>
                                        <option value={1}>False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold">Device Description :</label>
                                    <textarea type="text" rows={10} className="form-control "
                                        onChange={(e) => { deviceData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Room Infomation</h3>
                            <div className="col-12">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room :</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { deviceData.roomId = parseInt(e.target.value) }}>
                                        <option defaultValue={null} >Open this select menu</option>
                                        {
                                            roomArray.map(item =>
                                                <option key={item.id} value={item.id}>
                                                    {item.roomCode}
                                                    , {item.description}</option>
                                            )
                                        }
                                    </select>
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

export default AdminDeviceCreate;