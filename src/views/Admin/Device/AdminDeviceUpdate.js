import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceGetId, DeviceUpdate } from "../../../services/AdminApiConnection/adminDeviceApi";
import { RoomGetSelect } from "../../../services/AdminApiConnection/adminRoomApi";
import { ServiceGetSelect } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminDeviceUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [deviceDetail, setDeviceDetail] = useState([]);

    const [deviceRoom, setDeviceRoom] = useState([]);

    const [deviceServices, setDeviceServices] = useState([]);

    const [roomSelect, setRoomSelect] = useState([]);

    const [serviceSelect, setServiceSelect] = useState([])

    let deviceData = {
        id: param.id,
        deviceValue: null,
        deviceName: null,
        description: null,
        imageFile: null,
        status: null,
        roomId: null,
        serviceIdList: [],
    }


    // Get 

    const getData = async (id) => {
        let device = await DeviceGetId(id);

        setDeviceDetail(device.data);

        setDeviceRoom(device.data.room);

        setDeviceServices(device.data.services);

        await RoomGetSelect((response) => setRoomSelect(response.data))

        await ServiceGetSelect((response) => setServiceSelect(response.data));

    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);

    useEffect(() => {
        deviceData.deviceName = deviceDetail.deviceName;
        deviceData.deviceValue = deviceDetail.deviceValue;
        deviceData.status = deviceDetail.status;
        deviceData.description = deviceDetail.description;
        deviceData.roomId = deviceRoom.id;
        deviceServices.map(item => deviceData.serviceIdList.push(item.id))
    })


    //Update
    const handleUpdate = async () => {
        let data = new FormData()
        data.append('id', deviceData.id);
        data.append('deviceValue', deviceData.deviceValue);
        data.append('deviceName', deviceData.deviceName);
        data.append('description', deviceData.description);
        data.append('status', deviceData.status);
        data.append('roomId', deviceData.roomId);
        deviceData.serviceIdList.map(item =>
            data.append('serviceIdList', item))
        data.append('imageFile', deviceData.imageFile);
        let res = await DeviceUpdate(data);

        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/device');
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    // Handle Services 
    const handleServices = (e) => {
        if (e.target.checked) {
            deviceData.serviceIdList.push(parseInt(e.target.value))
        }
        else {
            deviceData.serviceIdList = deviceData.serviceIdList.filter(item => item !== parseInt(e.target.value))
        }
        console.log(deviceData.serviceIdList);
    }


    //Back
    const handleBack = () => {
        navigate('/admin/device');
    }
    return (
        <>
            <div className="admin-device-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Device Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Device Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Name :</label>
                                    <input type="text" className="form-control" placeholder={deviceDetail.deviceName}
                                        onChange={(e) => { deviceData.deviceName = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Value :</label>
                                    <input type="text" className="form-control" placeholder={deviceDetail.deviceValue}
                                        onChange={(e) => { deviceData.deviceValue = e.target.value }}
                                    />

                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Status :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { e.target.value === 0 ? deviceData.status = true : deviceData.status = false }}>
                                        <option defaultValue={null} hidden> {deviceDetail.status === true ? 'True' : ' False'}</option>
                                        <option value={0}>True</option>
                                        <option value={1}>False</option>
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
                            <div className="col-12">
                                <label className="fw-bold"> Image: </label>
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className="d-flex justify-content-center">
                                            <img src={deviceDetail.imageURL} width='25%' alt="" />
                                        </div>
                                    </div>

                                </div>
                                <input className="form-control" type="file" id="formFile"
                                    onChange={(e) => deviceData.imageFile = e.target.files[0]} />
                            </div>
                        </div>
                        <div className="row">
                            <h3>Room Infomation</h3>
                            <div className="col-12">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Room :</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { deviceData.roomId = parseInt(e.target.value) }}>
                                        <option defaultValue={deviceRoom.id} >{deviceRoom.roomCode}</option>
                                        {
                                            roomSelect.map((item, index) =>
                                                <option key={index} value={item.id}>
                                                    {item.code}
                                                    , {item.description}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <h3>Service Infomation</h3>
                            <div className="row my-2">
                                <h6>Update Services:</h6>
                                {serviceSelect.map((item, index) =>
                                    <div className="col-6 col-sm-4 col-md-3" key={index}>
                                        <div className="form-check ">
                                            <input className="form-check-input" type="checkbox" id={index} value={item.id} defaultChecked={(deviceServices.map(dItem => dItem.id).indexOf(item.id) !== -1)} onClick={(e) => { handleServices(e) }} />
                                            <label className="form-check-label" htmlFor={index}>
                                                {item.code}, {item.name}
                                            </label>
                                        </div>
                                    </div>
                                )}
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

export default AdminDeviceUpdate