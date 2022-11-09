import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceGetSelect } from "../../../services/AdminApiConnection/adminDeviceApi";
import { ServiceGetId, ServiceUpdate } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [serviceDetail, setServiceDetail] = useState([]);

    const [serviceDevices, setServiceDevices] = useState([]);


    const [deviceSelect, setDeviceSelect] = useState([])

    let serviceData = {
        id: param.id,
        serviceCode: null,
        serviceName: null,
        description: null,
        price: null,
        imageFile: null,
        deviceIdList: [],
    }


    // Get 

    const getData = async (id, page) => {
        let service = await ServiceGetId(id);
        setServiceDetail(service.data);

        setServiceDevices(service.data.devices)

        await DeviceGetSelect((response) => setDeviceSelect(response.data));
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        serviceData.serviceCode = serviceDetail.serviceCode
        serviceData.serviceName = serviceDetail.serviceName
        serviceData.description = serviceDetail.description
        serviceData.price = serviceDetail.price

        serviceDevices.map(item => serviceData.deviceIdList.push(item.id))
    },);

    // Handle Devices 
    const handleDevices = (e) => {
        if (e.target.checked) {
            serviceData.deviceIdList.push(parseInt(e.target.value))
        }
        else {
            serviceData.deviceIdList = serviceData.deviceIdList.filter(item => item !== parseInt(e.target.value))
        }
    }


    //Update
    const handleUpdate = async () => {
        console.log(serviceData);
        let data = new FormData()
        data.append('id', serviceData.id);
        data.append('serviceCode', serviceData.serviceCode);
        data.append('serviceName', serviceData.serviceName);
        data.append('description', serviceData.description);
        data.append('price', serviceData.price);

        serviceData.deviceIdList.map(item =>
            data.append('deviceIdList', item)
        );

        data.append('imageFile', serviceData.imageFile);

        let res = await ServiceUpdate(data);
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/service');
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
            <div className="admin-service-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Service Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Code :</label>
                                    <input type="text" className="form-control" placeholder={serviceDetail.serviceCode}
                                        onChange={(e) => { serviceData.serviceCode = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Name :</label>
                                    <input type="text" className="form-control" placeholder={serviceDetail.serviceName}
                                        onChange={(e) => { serviceData.serviceName = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Price :</label>
                                    <input type="text" className="form-control" placeholder={serviceDetail.price}
                                        onChange={(e) => { serviceData.price = e.target.value }}
                                    />

                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold">Description :</label>
                                    <textarea type="text" rows={5} className="form-control" placeholder={serviceDetail.description}
                                        onChange={(e) => { serviceData.description = e.target.value }} />
                                </div>
                            </div>
                            <div className="col-12">
                                <label className="fw-bold"> Image: </label>
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <div className="d-flex justify-content-center">
                                            <img src={serviceDetail.imageURL} width='25%' alt="" />
                                        </div>
                                    </div>
                                </div>
                                <input className="form-control" type="file" id="formFile"
                                    onChange={(e) => serviceData.imageFile = e.target.files[0]} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <h3>Device Infomation</h3>
                            <div className="row my-2">
                                <h6>Update Devices:</h6>
                                {deviceSelect.map((item, index) =>
                                    <div className="col-6 col-sm-4 col-md-3" key={index}>
                                        <div className="form-check ">
                                            <input className="form-check-input" type="checkbox" id={index} value={item.id} defaultChecked={(serviceDevices.map(dItem => dItem.id).indexOf(item.id) !== -1)} onClick={(e) => { handleDevices(e) }} />
                                            <label className="form-check-label" htmlFor={index}>
                                                {item.id}, {item.name}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <button className="btn btn-success me-2" onClick={() => handleUpdate()}>Update</button>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminServiceUpdate