import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDevice } from "../../../services/admin/device/apiDevice";
import { getRoom } from "../../../services/admin/room/apiRoom";
import { getService } from "../../../services/admin/service/apiService";

function DeviceCreate() {
    const navigate = useNavigate()

    const [deviceData, setDeviceData] = useState('');

    const [room, setRoom] = useState([]);

    const [service, setService] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ




    const load = async () => {
        const resRoom = await getRoom();
        const resService = await getService()
        setRoom(resRoom.data)
        setService(resService.data)
    }

    useEffect(() => {
        load();
    }, [])

    //Handle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImage = (e) => {
        const { name, files } = e.target;
        setDeviceData((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleRoom = (roomId) => {
        const id = parseInt(roomId);
        const name = "RoomId"
        setDeviceData((prevState) => ({
            ...prevState,
            [name]: name === id ? null : id
        }));
    };

    const handleService = (serviceId) => {
        const id = parseInt(serviceId);
        const name = "ServiceIdList"
        setDeviceData((prevState) => {

            const list = prevState[name] || [];
            if (list.includes(id)) {
                return {
                    ...prevState,
                    [name]: list.filter((serviceId) => serviceId !== id)
                };
            } else {
                return {
                    ...prevState,
                    [name]: [...list, id]
                };
            }
        })
    };

    const handleCreateDevice = async () => {
        if (!deviceData.RoomId) {
            toast.error("Please select room !")
        }
        else if (!deviceData.DeviceName || !deviceData.DeviceValue || !deviceData.Description || !deviceData.ImageFile || !deviceData.Date || !deviceData.Status) {
            toast.error("Please fill in all Input !")
        }
        else {
            const fromData = new FormData();
            fromData.append("DeviceName", deviceData.DeviceName)
            fromData.append("DeviceValue", deviceData.DeviceValue)
            fromData.append("Description", deviceData.Description)
            fromData.append("ImageFile", deviceData.ImageFile)
            fromData.append("Date", deviceData.Date)
            fromData.append("Status", deviceData.Status)
            fromData.append("RoomId", deviceData.RoomId)
            fromData.append("ServiceIdList", deviceData.ServiceIdList && deviceData.ServiceIdList.length ? deviceData.ServiceIdList : [0])

            const res = await createDevice(fromData);
            if (res.status === 200) {
                toast.success("Create Device Success")
                navigate('/admin/device')
            }
            else {
                toast.error("Create Device Fail !")
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
        <div className="device-create">

            <div className="row">
                <h1>Device Create</h1>
            </div>
            <hr />
            <div className="row">
                <h4 className="alert alert-secondary">Device Infomation</h4>
                <div className="col-lg-6 col-sm-12 mb-3">

                    <label htmlFor="DeviceName" className="form-label">Device Name: </label>
                    <input type="text" className={`form-control  ${isTouched.DeviceName && (dataError.DeviceName ? "is-invalid" : "is-valid")}`}
                        id="DeviceName" name="DeviceName" placeholder="Surgical knife"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.DeviceName
                        ? <div className="invalid-feedback">
                            {dataError.DeviceName}
                        </div>
                        : null}

                    <label htmlFor="DeviceValue" className="form-label">Device Value: </label>
                    <input type="number" className={`form-control  ${isTouched.DeviceValue && (dataError.DeviceValue ? "is-invalid" : "is-valid")}`}
                        id="DeviceValue" name="DeviceValue" placeholder="1000000"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.DeviceValue
                        ? <div className="invalid-feedback">
                            {dataError.DeviceValue}
                        </div>
                        : null}

                    <label htmlFor="Date" className="form-label">Date: </label>
                    <input type="date" className={`form-control  ${isTouched.Date && (dataError.Date ? "is-invalid" : "is-valid")}`}
                        id="Date" name="Date"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.Date
                        ? <div className="invalid-feedback">
                            {dataError.Date}
                        </div>
                        : null}

                    <label htmlFor="Status" className="form-label">Status: </label>
                    <select className={`form-control  ${isTouched.Status && (dataError.Status ? "is-invalid" : "is-valid")}`}
                        id="Status" name="Status"
                        onBlur={validate} onChange={handleChange}>
                        <option value="">-- Select Status --</option>
                        <option value={true}>Active</option>
                        <option value={false}>Non-Active</option>
                    </select>
                    {dataError.Status
                        ? <div className="invalid-feedback">
                            {dataError.Status}
                        </div>
                        : null}

                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                    <label htmlFor="ImageFile" className="form-label">Image File: </label>
                    <input type="file" className={`form-control  ${isTouched.ImageFile && (dataError.ImageFile ? "is-invalid" : "is-valid")}`}
                        id="ImageFile" name="ImageFile" accept="image/png, image/jpeg"
                        onBlur={validate} onChange={handleImage} />
                    {dataError.ImageFile
                        ? <div className="invalid-feedback">
                            {dataError.ImageFile}
                        </div>
                        : null}


                    <label htmlFor="Description" className="form-label">Description: </label>
                    <textarea className={`form-control  ${isTouched.Description && (dataError.Description ? "is-invalid" : "is-valid")}`}
                        id="Description" name="Description" placeholder="Device for ..."
                        onBlur={validate} onChange={handleChange}></textarea>
                    {dataError.Description
                        ? <div className="invalid-feedback">
                            {dataError.Description}
                        </div>
                        : null}

                </div>
            </div>
            <div className="row">
                <h4 className="alert alert-secondary">Room </h4>
                <div className="col-12 row mb-3">
                    {room.map((room) => (
                        <div className="col-4" key={room.id}>
                            <div
                                className={`card ${deviceData.RoomId === room.id ? 'bg-primary' : ''}`}
                                onClick={() => handleRoom(room.id)}
                            >
                                <div className="card-body">
                                    <h6 className="card-title">{`Room Code: ${room.code}`}</h6>
                                    <p className="card-text">{`Description: ${room.description}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                <h4 className="alert alert-secondary">Services </h4>
                <div className="col-12 row mb-3">
                    {service.map((service) => (
                        <div className="col-4" key={service.id}>
                            <div
                                className={`card ${deviceData.ServiceIdList && deviceData.ServiceIdList.includes(service.id) ? 'bg-primary' : ''}`}
                                onClick={() => handleService(service.id)}
                            >
                                <div className="card-body">
                                    <h6 >{`Id: ${service.id}`}</h6>
                                    <h6 className="card-subtitle">{`Device Name: ${service.name}`}</h6>
                                    <p className="card-text">{`Description: ${service.description}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn btn-success" onClick={handleCreateDevice}>Create</button>
        </div>
    </>);
}

export default DeviceCreate;