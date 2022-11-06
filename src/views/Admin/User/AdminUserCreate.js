import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeviceGetSelect } from "../../../users/AdminApiConnection/adminDeviceApi";
import { UserCreate } from "../../../users/AdminApiConnection/adminUserApi";

function AdminUserCreate() {
    const navigate = useNavigate();

    const [devices, setDevices] = useState([]);

    let userData = {
        userCode: null,
        userName: null,
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
            userData.deviceIdList.push(e.target.value)
        }
        else {
            userData.deviceIdList = userData.deviceIdList.filter(item => item !== e.target.value)
        }
    }

    //Create
    const handleCreate = async () => {
        let data = new FormData();
        data.append('userCode', userData.userCode);
        data.append('userName', userData.userName);
        data.append('description', userData.description);
        data.append('price', userData.price);
        data.append('imageFile', userData.imageFile);

        userData.deviceIdList.map(item =>
            data.append('deviceIdList', item)
        );

        let res = await UserCreate(data);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/admin/user')
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/user');
    }

    return (
        <>
            <div className="admin-user-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        User Create
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>User Infomation</h3>
                            <div className="col-12 col-md-6">

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Code :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { userData.userCode = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Name :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { userData.userName = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Price :</label>
                                    <input type="number" className="form-control "
                                        onChange={(e) => { userData.price = parseInt(e.target.value) }}
                                    />
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold"> Description :</label>
                                    <textarea type="text" rows={5} className="form-control "
                                        onChange={(e) => { userData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold"> Image :</label>
                                    <input className="form-control" type="file" id="formFile"
                                        onChange={(e) => { userData.imageFile = e.target.files[0] }} />
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

export default AdminUserCreate;