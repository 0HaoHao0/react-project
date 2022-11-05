import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceGetSelect } from "../../../services/AdminApiConnection/adminDeviceApi";
import { ServiceCreate } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceCreate() {
    const navigate = useNavigate();

    const [devices, setDevices] = useState([]);

    let serviceData = {
        serviceCode: null,
        serviceName: null,
        description: null,
        price: null,
        imageFile: null,
        deviceIdList: [],
    }
    // Get Data
    const getData = async (page) => {
        //Get Divice List

        await DeviceGetSelect((response) => setDevices(response.data));

    }

    useEffect(() => {
        getData();
    }, [])

    // Handle Devices 
    const handleDevices = (e) => {
        if (e.target.checked) {
            serviceData.deviceIdList.push(e.target.value)
        }
        else {
            serviceData.deviceIdList = serviceData.deviceIdList.filter(item => item !== e.target.value)
        }
    }

    //Create
    const handleCreate = async () => {
        console.log(serviceData);
        let data = new FormData();
        data.append('serviceCode', serviceData.serviceCode);
        data.append('serviceName', serviceData.serviceName);
        data.append('description', serviceData.description);
        data.append('price', serviceData.price);
        data.append('imageFile', serviceData.imageFile);

        serviceData.deviceIdList.map(item =>
            data.append('deviceIdList', item)
        );

        let res = await ServiceCreate(data);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/admin/service')
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/service');
    }

    return (
        <>
            <div className="admin-service-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Service Create
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation</h3>
                            <div className="col-12 col-md-6">

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Code :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { serviceData.serviceCode = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Name :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { serviceData.serviceName = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Price :</label>
                                    <input type="number" className="form-control "
                                        onChange={(e) => { serviceData.price = parseInt(e.target.value) }}
                                    />
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold"> Description :</label>
                                    <textarea type="text" rows={5} className="form-control "
                                        onChange={(e) => { serviceData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold"> Image :</label>
                                    <input className="form-control" type="file" id="formFile"
                                        onChange={(e) => { serviceData.imageFile = e.target.files[0] }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Device Infomation</h3>
                            {devices.map((item, index) =>
                                <div className="col-12 col-sm-6 col-md-4 " key={index}>
                                    <div className="form-check d-flex align-items-center my-2">
                                        <input className="form-check-input me-4" type="checkbox" id={index} value={item.id} onClick={(e) => { handleDevices(e) }} />
                                        <label className="form-check-label" htmlFor={index}>
                                            <div className="card">
                                                <h5 className="card-header">ID: {item.id}</h5>
                                                <div className="card-body">
                                                    <h5 className="card-title">Name: {item.name}</h5>
                                                    <p className="card-text">{item.description}</p>
                                                </div>
                                            </div>

                                        </label>
                                    </div>
                                </div>
                            )}
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

export default AdminServiceCreate;