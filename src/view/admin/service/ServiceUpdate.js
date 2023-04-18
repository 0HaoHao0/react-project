import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getDevice } from "../../../services/admin/device/apiDevice";
import { updateService } from "../../../services/admin/service/apiService";

// Editor
import { Editor } from 'primereact/editor';
import { MultiSelect } from 'primereact/multiselect';



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

    const handleEditor = (name, value) => {
        setServiceData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        validateEditor(name, value);
    }




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
                    const res = await updateService(fromData);
                    Swal.close()

                    if (res.status === 200) {
                        toast.success("Update Service Success")
                        navigate('/admin/service')
                    }
                    else if(res.status < 500) {
                        toast.error(res.data || "Something wrong!");
                    }
                    else {
                        toast.error("Something wrong!");
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


    const validateEditor = (name, value) => {
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        console.log(value);
        if (!value) {
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
            <h1>Service Update</h1>
            <hr />
            <div className="container row">
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

                    <label htmlFor="Description" className="form-label">Description: </label>
                    <Editor value={serviceData.description} type='editor' name='Description' style={{ minHeight: '250px' }}
                        onTextChange={(e) => { handleEditor('description', e.htmlValue) }}
                    />
                    {dataError.Description
                        && <span className="invalid-feedback d-inline">
                            {dataError.Description}
                        </span>}

                </div>

                <h4 className="alert alert-secondary">Devices </h4>
                <div className="mb-2">
                    <div className="col-12">
                        <MultiSelect value={serviceData.DeviceIdList} onChange={(e) => setServiceData((prevState) => ({ ...prevState, DeviceIdList: e.value }))} options={device} optionValue="id" optionLabel='name' filter
                            placeholder="Select Device" className="w-100 " />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateService}>Update</button>
        </div>
    </>);
}

export default ServiceUpdate;