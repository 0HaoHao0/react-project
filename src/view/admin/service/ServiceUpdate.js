import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getDevice } from "../../../services/admin/device/apiDevice";
import { updateService } from "../../../services/admin/service/apiService";

// Editor
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'



function ServiceUpdate() {
    let { state } = useLocation();

    const navigate = useNavigate()

    const [serviceData, setServiceData] = useState(state);

    const [device, setDevice] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ

    //Handle Image
    const [imageFileUrl, setImageFileUrl] = useState(null)







    useEffect(() => {
        const load = async () => {
            const resDevice = await getDevice();
            setDevice(resDevice.data)

            //Set RoomId and SerIdList
            setServiceData((prevState) => ({
                ...prevState,
                DeviceIdList: state.devices.map(device => device.id)
            }))

        }
        load();
    }, [state])

    //Handle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevState) => ({
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

        setServiceData((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };



    const handleDevice = (serviceId) => {
        const id = parseInt(serviceId);
        const name = "DeviceIdList"
        setServiceData((prevState) => {

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

    const handleUpdateService = async () => {

        if (!serviceData.serviceName || !serviceData.serviceCode || !serviceData.description || !serviceData.price) {
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
                    fromData.append("Id", serviceData.id)
                    fromData.append("ServiceCode", serviceData.serviceCode)
                    fromData.append("ServiceName", serviceData.serviceName)
                    fromData.append("Description", serviceData.description)
                    fromData.append("ImageFile", serviceData.imageFile)
                    fromData.append("Price", serviceData.price)
                    fromData.append("DeviceIdList", serviceData.DeviceIdList && serviceData.DeviceIdList.length ? serviceData.DeviceIdList : [0])

                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await updateService(fromData);
                    Swal.close()

                    if (res.status === 200) {
                        toast.success("Update Service Success")
                        navigate('/admin/service')
                    }
                    else {
                        toast.error("Update Service Fail !")
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

    return (<>
        <div className="service-update">
            <div className="row">
                <h1>Service Update</h1>
            </div>
            <hr />
            <div className="row">
                <h4 className="alert alert-secondary">Service Infomation</h4>
                <div className="text-center">
                    <img height='250px' width='250px' src={!serviceData.imageFile ? serviceData.imageURL : imageFileUrl} alt="" />
                </div>
                <div className="col-lg-6 col-sm-12 mb-3">


                    <label htmlFor="serviceCode" className="form-label">Service Code: </label>
                    <input type="text" className={`form-control  ${isTouched.serviceCode && (dataError.serviceCode ? "is-invalid" : "is-valid")}`}
                        id="serviceCode" name="serviceCode" placeholder={serviceData.serviceCode} value={serviceData.serviceCode}
                        onBlur={validate} onChange={handleChange} />
                    {dataError.serviceCode
                        ? <div className="invalid-feedback">
                            {dataError.serviceCode}
                        </div>
                        : null}

                    <label htmlFor="serviceName" className="form-label">Service Name: </label>
                    <input type="text" className={`form-control  ${isTouched.serviceName && (dataError.serviceName ? "is-invalid" : "is-valid")}`}
                        id="serviceName" name="serviceName" placeholder={serviceData.serviceName} value={serviceData.serviceName}
                        onBlur={validate} onChange={handleChange} />
                    {dataError.serviceName
                        ? <div className="invalid-feedback">
                            {dataError.serviceName}
                        </div>
                        : null}


                    <label htmlFor="price" className="form-label">Price: </label>
                    <input type="number" className={`form-control  ${isTouched.price && (dataError.price ? "is-invalid" : "is-valid")}`}
                        id="price" name="price" placeholder={serviceData.price} value={serviceData.price}
                        onBlur={validate} onChange={handleChange} />
                    {dataError.price
                        ? <div className="invalid-feedback">
                            {dataError.price}
                        </div>
                        : null}
                </div>
                <div className="col-lg-6 col-sm-12 mb-3">
                    <label htmlFor="imageFile" className="form-label">Image File: </label>
                    <input type="file" className={`form-control `}
                        id="imageFile" name="imageFile" accept="image/png, image/jpeg"
                        onBlur={validate} onChange={handleImage} />





                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description: </label>
                    <div className="ckeditor">
                        <CKEditor
                            editor={Editor}
                            config={{
                                cloudServices: {
                                    tokenUrl: 'https://96022.cke-cs.com/token/dev/4f421aeddafb7c431e79a6743fefd3a8fc56e68d043e13455ccf262b10c4?limit=10',
                                    uploadUrl: 'https://96022.cke-cs.com/easyimage/upload/'
                                }
                            }}
                            data={serviceData.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                const e =
                                {
                                    target: {
                                        name: 'description',
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
                                        name: 'description',
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
            </div>

            <div className="row">
                <h4 className="alert alert-secondary">Devices </h4>
                <div className="col-12 row mb-3">
                    {device.map((device) => (
                        <div className="col-4" key={device.id}>
                            <div
                                className={`card ${serviceData.DeviceIdList && serviceData.DeviceIdList.includes(device.id) ? 'bg-primary' : ''}`}
                                onClick={() => handleDevice(device.id)}
                            >
                                <div className="card-body">
                                    <h6 >{`Id: ${device.id}`}</h6>
                                    <h6 className="card-subtitle">{`Service Name: ${device.name}`}</h6>
                                    <p className="card-text">{`description: ${device.description}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateService}>Update</button>
        </div>
    </>);
}

export default ServiceUpdate;