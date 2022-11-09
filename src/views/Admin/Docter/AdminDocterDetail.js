import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DocterGetId } from "../../../services/AdminApiConnection/adminDoctorApi";

function AdminDocterDetail() {
    const param = useParams()

    const navigate = useNavigate();


    // const [data, setData] = useState([]);

    const [doctorBaseUser, setDoctorBaseUser] = useState([]);

    const [doctorMajor, setDoctorMajor] = useState([]);

    const [doctorCer, setDoctorCer] = useState([]);


    const getData = async (id) => {
        await DocterGetId(id, (response) => {
            // setData(response.data);
            setDoctorBaseUser(response.data.baseUser);
            setDoctorMajor(response.data.major);
            setDoctorCer(response.data.certificate)
        });
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);

    //Back
    const handleBack = () => {
        navigate('/admin/docter');
    }


    return (
        <>
            <div className="admin-docter-detail">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Docter Detail
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Docter Information :</h3>

                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> User Name :</label> {doctorBaseUser.userName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Full Name :</label> {doctorBaseUser.fullName}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Email :</label> {doctorBaseUser.email}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Phone Number :</label> {doctorBaseUser.phoneNumber}
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Birth Date :</label> {doctorBaseUser.birthDate}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Gender :</label> {doctorBaseUser.gender}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Address :</label> {doctorBaseUser.address}
                                </div>
                                <div className="form-group my-2">
                                    <label className="fw-bold"> Role :</label> {doctorBaseUser.role}
                                </div>
                            </div>
                            <hr />
                            <div className="col-12">
                                <label className="fw-bold"> Image: </label>
                                <div className="row">
                                    <div className="col-12 p5">
                                        <div className=" d-flex justify-content-center p-5">
                                            <img src={doctorBaseUser.imageURL} width='50%' alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Major Information</h3>
                            <div className="col-12">
                                <label className="fw-bold"> Major: </label> {doctorMajor.name}
                                <br />
                                <label className="fw-bold"> Certificate: </label>
                                <a href={doctorCer.fileURL} className='btn btn-primary m-4' target="_blank" rel="noreferrer">View</a>
                            </div>
                        </div>
                        <hr />

                        <div className="my-4">
                            <Link to={`/admin/docter/update/${param.id}`} className="btn btn-primary me-2" >Update</Link>
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDocterDetail;