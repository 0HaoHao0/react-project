import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDevice } from "../../../services/admin/device/apiDevice";
import { createService } from "../../../services/admin/service/apiService";

// Editor
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Swal from "sweetalert2";


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
            if (serviceData.DeviceIdList) {
                serviceData.DeviceIdList.forEach(element => {
                    fromData.append("DeviceIdList", element)
                });
            }
            else {
                fromData.append("DeviceIdList", 0)
            }

            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading()
            const res = await createService(fromData);
            Swal.close()

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

            <h1>Service Create</h1>
            <hr />
            <div className="container row">
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



                </div>
                <div className="col-12 mb-3">

                    <label htmlFor="Description" className="form-label">Description: </label>
                    <div className="ckeditor">
                        <CKEditor
                            editor={Editor}
                            config={{
                                cloudServices: {
                                    tokenUrl: 'https://96022.cke-cs.com/token/dev/4f421aeddafb7c431e79a6743fefd3a8fc56e68d043e13455ccf262b10c4?limit=10',
                                    uploadUrl: 'https://96022.cke-cs.com/easyimage/upload/'
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                const e =
                                {
                                    target: {
                                        name: 'Description',
                                        value: data,
                                    }
                                }
                                handleChange(e);
                            }}
                            onBlur={(event, editor) => {
                                const data = editor.getData();
                                const e =
                                {
                                    target: {
                                        name: 'Description',
                                        value: data,
                                    }
                                }
                                validate(e)
                            }}
                        />
                    </div>
                    <div>
                        {dataError.description
                            && <span className="text-danger">
                                {dataError.description}
                            </span>}
                    </div>
                </div>
                <h4 className="alert alert-secondary">Device Select</h4>
                <div className="row mb-3">
                    {device.map((device) => (
                        <div className="col-4 mb-2" key={device.id}>
                            <div className={`card h-100 ${serviceData.DeviceIdList && serviceData.DeviceIdList.includes(device.id) ? 'bg-primary text-white' : ''}`}
                                onClick={() => handleDevice(device.id)}>
                                <div className="card-body">
                                    <h4 className="card-title">{`Id: ${device.id}`}</h4>
                                    <p className="card-text">{`Service Name: ${device.name}`}</p>
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