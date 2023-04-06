import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateDevice } from "../../../services/admin/device/apiDevice";
import { getRoom } from "../../../services/admin/room/apiRoom";
import { getService } from "../../../services/admin/service/apiService";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

function DeviceUpdate() {
    let { state } = useLocation();
    const navigate = useNavigate()

    const [deviceData, setDeviceData] = useState(state);

    const [room, setRoom] = useState([]);

    const [service, setService] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ

    //Handle Image
    const [imageFileUrl, setImageFileUrl] = useState(null)

    useEffect(() => {
        const load = async () => {
            const resRoom = await getRoom();
            const resService = await getService()
            setRoom(resRoom.data)
            setService(resService.data)

            //Set RoomId and SerIdList
            setDeviceData((prevState) => ({
                ...prevState,
                RoomId: state.room.id,
                ServiceIdList: state.services.map(service => service.id)
            }))

        }
        load();
    }, [state])

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
        const reader = new FileReader();


        reader.addEventListener("load", () => {
            setImageFileUrl(reader.result);
        });

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }

        setDeviceData((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };



    const handleUpdateDevice = async () => {
        if (!deviceData.RoomId) {
            toast.error("Please select room !")
        }
        else if (!deviceData.deviceName || !deviceData.deviceValue || !deviceData.description || !deviceData.date) {
            toast.error("Please fill in all Input !")
        }
        else {
            Swal.fire({
                title: 'Are You Sure ?',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'OK',
                focusCancel: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Xử lý khi người dùng bấm OK
                    const fromData = new FormData();
                    fromData.append("Id", deviceData.id)
                    fromData.append("DeviceName", deviceData.deviceName)
                    fromData.append("DeviceValue", deviceData.deviceValue)
                    fromData.append("Description", deviceData.description)
                    fromData.append("ImageFile", deviceData.imageFile)
                    fromData.append("Date", deviceData.date)
                    fromData.append("Status", deviceData.status)
                    fromData.append("RoomId", deviceData.RoomId)

                    if (deviceData.ServiceIdList) {
                        deviceData.ServiceIdList.forEach(element => {
                            fromData.append("ServiceIdList", element)
                        });
                    }
                    else {
                        fromData.append("ServiceIdList", 0)
                    }

                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading();
                    const res = await updateDevice(fromData);
                    if (res.status === 200) {
                        toast.success("Update Device Success")
                        navigate('/admin/device')
                    }
                    else if(res.status < 500) {
                        toast.error(res.data);
                    }
                    else {
                        toast.error("Update Device Fail !")
                    }
                } else {
                    // Xử lý khi người dùng bấm Cancel
                    toast.info("Update cancelled");
                }
            });


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
    // Formart date

    const formattedDate = (date) => {
        return moment(date, "YYYY-MM-DDTHH:mm:ss").format("yyyy-MM-DD");
    }
    return (<>
        <div className="device-update p-5">

            <h1>Device Update</h1>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <h4 className="alert alert-secondary">Device Infomation</h4>
                    <div className="text-center">
                        <img height='250px' width='250px' src={!deviceData.imageFile ? deviceData.imageURL : imageFileUrl} alt="" />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">

                        <label htmlFor="deviceName" className="form-label">Device Name: </label>
                        <input type="text" className={`form-control  ${isTouched.deviceName && (dataError.deviceName ? "is-invalid" : "is-valid")}`}
                            id="deviceName" name="deviceName" placeholder={deviceData.deviceName} value={deviceData.deviceName}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.deviceName
                            ? <div className="invalid-feedback">
                                {dataError.deviceName}
                            </div>
                            : null}

                        <label htmlFor="deviceValue" className="form-label">Device Value: </label>
                        <input type="number" className={`form-control  ${isTouched.deviceValue && (dataError.deviceValue ? "is-invalid" : "is-valid")}`}
                            id="deviceValue" name="deviceValue" placeholder={deviceData.deviceValue} value={deviceData.deviceValue}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.deviceValue
                            ? <div className="invalid-feedback">
                                {dataError.deviceValue}
                            </div>
                            : null}

                        <label htmlFor="date" className="form-label">Date: </label>
                        <input type="date" className={`form-control  ${isTouched.date && (dataError.date ? "is-invalid" : "is-valid")}`}
                            id="date" name="date" defaultValue={formattedDate(deviceData.date)}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.date
                            ? <div className="invalid-feedback">
                                {dataError.date}
                            </div>
                            : null}

                        <label htmlFor="status" className="form-label">Status: </label>
                        <select className={`form-control  ${isTouched.status && (dataError.status ? "is-invalid" : "is-valid")}`}
                            id="status" name="status"
                            onBlur={validate} onChange={handleChange}>
                            <option hidden >{deviceData.status === true ? "Active" : "Non-Active"}</option>
                            <option value={true}>Active</option>
                            <option value={false}>Non-Active</option>
                        </select>
                        {dataError.status
                            ? <div className="invalid-feedback">
                                {dataError.status}
                            </div>
                            : null}

                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">
                        <label htmlFor="imageFile" className="form-label">Image File: </label>
                        <input type="file" className={`form-control`}
                            id="imageFile" name="imageFile" accept="image/png, image/jpeg"
                            onBlur={validate} onChange={handleImage} />



                        <label htmlFor="description" className="form-label">Description: </label>
                        <textarea className={`form-control  ${isTouched.description && (dataError.description ? "is-invalid" : "is-valid")}`}
                            id="description" name="description" placeholder={deviceData.description} value={deviceData.description}
                            onBlur={validate} onChange={handleChange}></textarea>
                        {dataError.description
                            ? <div className="invalid-feedback">
                                {dataError.description}
                            </div>
                            : null}

                    </div>
                </div>
                <h4 className="alert alert-secondary">Room </h4>
                <div className="mb-2">
                    <div className="col-12">
                        <Dropdown value={deviceData.RoomId} onChange={(e) => setDeviceData((prevState) => ({ ...prevState, RoomId: e.value }))} options={room} optionLabel={'code'} optionValue="id" filter
                            placeholder="Select Room" className="w-100 " />
                    </div>
                </div>

                <h4 className="alert alert-secondary">Services </h4>
                <div className="mb-2">
                    <div className="col-12">
                        <MultiSelect value={deviceData.ServiceIdList} onChange={(e) => setDeviceData((prevState) => ({ ...prevState, ServiceIdList: e.value }))} options={service} optionValue="id" optionLabel='name' filter
                            placeholder="Select Service" className="w-100 " />
                    </div>
                </div>

            </div>
            <button className="btn btn-primary" onClick={handleUpdateDevice}>Update</button>
        </div>
    </>);
}

export default DeviceUpdate;