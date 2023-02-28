import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDevice } from "../../../services/admin/device/apiDevice";
import { createService } from "../../../services/admin/service/apiService";

function ServiceCreate() {
    const navigate = useNavigate()

    const [serviceData, setServiceData] = useState('');

    const [device, setDevice] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ




    const loadDevice = async () => {
        const res = await getDevice();
        setDevice(res.data)
    }

    useEffect(() => {
        loadDevice();
    }, [])

    //Hanlde

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImage = (e) => {
        const { name, files } = e.target;
        setServiceData((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleDevice = (deviceId) => {
        const id = parseInt(deviceId);
        const name = "DeviceIdList"
        setServiceData((prevState) => {

            const list = prevState[name] || [];
            if (list.includes(id)) {
                return {
                    ...prevState,
                    [name]: list.filter((deviceId) => deviceId !== id)
                };
            } else {
                return {
                    ...prevState,
                    [name]: [...list, id]
                };
            }
        })
    };

    const handleCreateService = async () => {

        if (!serviceData.ServiceName || !serviceData.ServiceCode || !serviceData.Description || !serviceData.ImageFile || !serviceData.Price) {
            toast.error("Please fill in all Input !")
        }
        else {
            const fromData = new FormData();
            fromData.append("ServiceName", serviceData.ServiceName)
            fromData.append("ServiceCode", serviceData.ServiceCode)
            fromData.append("Description", serviceData.Description)
            fromData.append("ImageFile", serviceData.ImageFile)
            fromData.append("Price", serviceData.Price)
            fromData.append("DeviceIdList", serviceData.DeviceIdList && serviceData.DeviceIdList.length ? serviceData.DeviceIdList : [0])

            const res = await createService(fromData);
            if (res.status === 200) {
                toast.success("Create Service Success")
                navigate('/admin/service')
            }
            else {
                toast.error("Create Service Fail !")
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
        <div className="service-create">

            <div className="row">
                <h1>Service Create</h1>
            </div>
            <hr />
            <div className="row">
                <h4 className="alert alert-secondary">Service Infomation</h4>
                <div className="col-lg-6 col-sm-12 mb-3">
                    <label htmlFor="ServiceName" className="form-label">Service Name: </label>
                    <input type="text" className={`form-control  ${isTouched.ServiceName && (dataError.ServiceName ? "is-invalid" : "is-valid")}`}
                        id="ServiceName" name="ServiceName" placeholder="Nhổ Răng"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.ServiceName
                        ? <div className="invalid-feedback">
                            {dataError.ServiceName}
                        </div>
                        : null}


                    <label htmlFor="ServiceCode" className="form-label">Service Code: </label>
                    <input type="text" className={`form-control  ${isTouched.ServiceCode && (dataError.ServiceCode ? "is-invalid" : "is-valid")}`}
                        id="ServiceCode" name="ServiceCode" placeholder="NR001 - (Nhổ Răng 001)"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.ServiceCode
                        ? <div className="invalid-feedback">
                            {dataError.ServiceCode}
                        </div>
                        : null}



                    <label htmlFor="Price" className="form-label">Price: </label>
                    <input type="number" className={`form-control  ${isTouched.Price && (dataError.Price ? "is-invalid" : "is-valid")}`}
                        id="Price" name="Price" placeholder="1000000"
                        onBlur={validate} onChange={handleChange} />
                    {dataError.Price
                        ? <div className="invalid-feedback">
                            {dataError.Price}
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
                        id="Description" name="Description" placeholder="Service for ..."
                        onBlur={validate} onChange={handleChange}></textarea>
                    {dataError.Description
                        ? <div className="invalid-feedback">
                            {dataError.Description}
                        </div>
                        : null}

                </div>
            </div>
            <div className="row">
                <h4 className="alert alert-secondary">Device Select</h4>
                <div className="col-12 row mb-3">
                    {device.map((device) => (
                        <div className="col-4" key={device.id}>
                            <div
                                className={`card ${serviceData.DeviceIdList && serviceData.DeviceIdList.includes(device.id) ? 'bg-primary' : ''}`}
                                onClick={() => handleDevice(device.id)}
                            >
                                <div className="card-body">
                                    <h6 >{`Id: ${device.id}`}</h6>
                                    <h6 className="card-subtitle">{`Device Name: ${device.name}`}</h6>
                                    <p className="card-text">{`Description: ${device.description}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="btn btn-success" onClick={handleCreateService}>Create</button>
        </div>
    </>);
}

export default ServiceCreate;