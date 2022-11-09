import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserGetId } from "../../../services/AdminApiConnection/adminUserApi";

function AdminUserDetail() {
    const param = useParams()
    const navigate = useNavigate();


    const [userData, setUserData] = useState([]);


    const getData = async (id) => {
        await UserGetId(id, (response) => { setUserData(response.data) });
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


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
            <div className="admin-user-detail">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        User Detail
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3 >User Infomation :</h3 >

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> User Name :</label> {userData.userName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Full Name :</label> {userData.fullName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Email :</label> {userData.email}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Phone Number :</label> {userData.phoneNumber}
                                </div>


                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Birth Date :</label> {convertDate(userData.birthDate)}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Gender :</label> {userData.gender}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Address :</label> {userData.address}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Role :</label> {userData.role}
                                </div>
                            </div>
                            <hr />
                            <div className="col-12">
                                <label className="fw-bold"> Avatar: </label>
                                <div className="row">
                                    <div className="col-12 p5">
                                        <div className="d-flex justify-content-center p-5">
                                            <img src={userData.imageURL} width='20%' alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr />
                        <div className="row">
                            <h3>Change Role:</h3>
                            <Link to={`/admin/docter/request`} state={{ id: param.id }} className='btn btn-primary mx-2'>Request Doctor</Link>
                        </div>
                        <hr />

                        <div className="my-4">
                            <Link to={`/admin/user/update/${param.id}`} className="btn btn-primary me-2" >Update</Link>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminUserDetail;