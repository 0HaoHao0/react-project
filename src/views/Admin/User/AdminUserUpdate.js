import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserGetId, UserUpdate } from "../../../services/AdminApiConnection/adminUserApi";

function AdminUserUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [data, setData] = useState([]);



    let userData = {
        userId: param.id,
        fullName: null,
        birthDate: null,
        gender: null,
        address: null,
    }


    // Get 

    const getData = async (id) => {

        await UserGetId(id, (response) => setData(response.data));
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        userData.fullName = data.fullName
        userData.birthDate = data.birthDate
        userData.gender = data.gender
        userData.address = data.address
    },);



    //Update
    const handleUpdate = async () => {
        let res;
        await UserUpdate(userData, (response) => { res = response });
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/user');
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }


    // Conver Date 
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj).toISOString().split('T')[0]

            return date;
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/user');
    }
    return (
        <>
            <div className="admin-user-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        User Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>User Infomation :</h3>

                            <div className="col-12">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Full Name :</label>
                                    <input type="text" className="form-control" placeholder={data.fullName}
                                        onChange={(e) => { userData.fullName = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Birth Date :</label>
                                    <input type="Date" className="form-control" defaultValue={convertDate(data.birthDate)}
                                        onChange={(e) => { userData.birthDate = e.target.value }}
                                    />

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Gender :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { userData.gender = e.target.value }}>
                                        <option defaultValue={data.gender} hidden>{data.gender}</option>
                                        <option value={'Male'}>Male</option>
                                        <option value={"Female"}>Female</option>
                                    </select>

                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Address :</label>
                                    <input type="text" className="form-control" placeholder={data.address}
                                        onChange={(e) => { userData.address = e.target.value }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-success" onClick={() => handleUpdate()}>Update</button>
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

export default AdminUserUpdate