import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceGetId, DeviceUpdate } from "../../../services/AdminApiConnection/adminDeviceApi";
import { RoomGetAll } from "../../../services/AdminApiConnection/adminRoomApi";

function AdminDeviceUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [deviceDetail, setDeviceDetail] = useState([]);

    const [roomArray, setRoomArray] = useState([])

    let deviceData = {
        id: param.id,
        deviceValue: null,
        deviceName: null,
        description: null,
        status: null,
        roomId: null,
    }


    // Get 

    const getData = async (id, page) => {
        let device = await DeviceGetId(id);
        let listRoom = await RoomGetAll(page);
        setDeviceDetail(device.data);
        setRoomArray(listRoom.data.data)
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        deviceData.deviceName = deviceDetail.deviceName
        deviceData.deviceValue = deviceDetail.deviceValue
        deviceData.description = deviceDetail.description
        deviceData.status = deviceDetail.status
        deviceData.roomId = deviceDetail.roomId

    },);


    //Update
    const handleUpdate = async () => {
        let res = await DeviceUpdate(deviceData);
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/device');
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
            <div className="admin-device-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Device Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Device Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Device Name :</label>
                                    <input type="text" className="form-control" placeholder={deviceDetail.deviceName}
                                        onChange={(e) => { deviceData.deviceName = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold">Device Value :</label>
                                    <input type="text" className="form-control" placeholder={deviceDetail.deviceValue}
                                        onChange={(e) => { deviceData.deviceValue = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Device Status :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { e.target.value === 0 ? deviceData.status = true : deviceData.status = false }}>
                                        <option defaultValue='' hidden> {deviceDetail.status === true ? 'True' : ' False'}</option>
                                        <option value={0}>True</option>
                                        <option value={1}>False</option>
                                    </select>

                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room :</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { deviceData.roomId = parseInt(e.target.value) }}>
                                        <option defaultValue='' hidden >{deviceDetail.roomId}</option>
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
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control" placeholder={deviceDetail.description}
                                        onChange={(e) => { deviceData.description = e.target.value }} />
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
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

export default AdminDeviceUpdate