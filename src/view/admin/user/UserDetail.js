import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteUser, updateRole } from "../../../services/admin/user/apiUser";

function UserDetail() {
    const { state } = useLocation();
    const navigate = useNavigate()

    const [patientInfo, setPatientInfo] = useState(state);


    let roleId = undefined;


    const options = [
        { value: "0", label: "Patient" },
        { value: "2", label: "Receptionist" },
        { value: "3", label: "Technical" },
        { value: "4", label: "Expert" },
        { value: "5", label: "Administrator" },
    ];


    const handleSelectChange = (event) => {
        roleId = parseInt(event.target.value);
    }


    const handleUpdate = () => {
        Swal.fire({
            title: 'Are You Sure ?',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'OK',
            focusCancel: true,
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng bấm OK
                if (roleId === undefined) {
                    toast.error("You haven't selected the role yet!");
                }
                else {
                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading();

                    const res = await updateRole(patientInfo.id, roleId);

                    if (res.status === 200) {
                        setPatientInfo(res.data);
                        toast.success("Update Successful!");
                    }
                    else {
                        toast.error("Something was wrong, please contact to Admin !!!")
                    }
                    Swal.close();
                }
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Update cancelled");
            }
        });

    }
    const handleDelete = () => {
        Swal.fire({
            title: 'Are You Sure ?',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'OK',
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng bấm OK
                Swal.fire({
                    title: "Loading...",
                    html: "Please wait a moment"
                })
                Swal.showLoading();
                const res = await deleteUser(state.id);
                Swal.close();

                if (res.status === 200) {
                    toast.success("Delete Successful!");
                    navigate("/admin/user");
                }
                else {
                    toast.error("Cannot delete this account, you can try lock!");

                }
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Delete cancelled");
            }
        });
    }
    return (
        <>
            <div className="user-detail">
                <div>
                    <h1>User Detail</h1>
                </div>
                <hr />
                <h1 className="alert alert-dark" role="alert" >Profile </h1>
                <div className="row g-0">

                    <div className="col-12 text-center my-4">
                        <img height="150px" width="150px" src={state.imageURL} alt="..." />
                    </div>
                    <div className="col-12 row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="UserName">User Name: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="UserName" placeholder={state.fullName} disabled />
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="FullName">Full Name: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="FullName" placeholder={state.fullName} disabled />
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="PhoneNumber">Phone Number: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="PhoneNumber" placeholder={state.phoneNumber} disabled />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Role: </div>
                                <div className="col-9 text-left">
                                    <select className='form-select' defaultChecked={patientInfo.role} aria-label="Default select example" onChange={handleSelectChange}>
                                        <option disabled defaultValue={patientInfo.role}>{patientInfo.role}</option>
                                        {options.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                hidden={option.label === patientInfo.role}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="BirthDate">Birth Date: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="BirthDate" placeholder={state.birthDate.split('T')[[0]]} disabled />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="Gender">Gender: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="Gender" placeholder={state.gender} disabled />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="Address">Address: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="Address" placeholder={state.address} disabled />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="Email">Email: </label>
                                </div>
                                <div className="col-md-9 ">
                                    <input type="text" className="form-control bg-white" id="Email" placeholder={state.email} disabled />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-md-3">
                                    <label htmlFor="EmailValidated">Email Validated: </label>
                                </div>
                                <div className="col-md-9 ">
                                    {state.emailConfirmed ?
                                        <button className="btn btn-success" disabled><i className="fa-solid fa-check"></i></button>
                                        :
                                        <button className="btn btn-danger" disabled><i className="fa-solid fa-x"></i></button>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-6">
                            <button className="btn btn-primary"
                                onClick={() => { handleUpdate() }}
                            > Update Role</button>

                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger"
                                onClick={() => { handleDelete() }}
                            >Delete</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetail;