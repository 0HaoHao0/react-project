import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteUser, updateRole } from "../../../services/admin/user/apiUser";

function UserDetail() {
    const { state } = useLocation();
    const navigate = useNavigate()

    const [patientInfo, setPatientInfo] = useState(state);
    const [isLoading, setIsLoading] = useState(false);


    let roleId = undefined;


    const options = [
        { value: "0", label: "Patient" },
        { value: "1", label: "Doctor" },
        { value: "2", label: "Receptionist" },
        { value: "3", label: "Technical" },
        { value: "4", label: "Expert" },
        { value: "4", label: "Administrator" },
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
                    setIsLoading(true);

                    const res = await updateRole(patientInfo.id, roleId);


                    setPatientInfo(res.data);

                    setIsLoading(false);

                    toast.success("Update Successful!");
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
                const res = await deleteUser(state.id);
                if (res.status === 200) {
                    toast.success("Delete Successful!");
                    navigate("/admin/user");
                }
                else {
                    toast.error("Something was wrong !!!")
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
                {isLoading && <div className="alert alert-warning">Please wait while we update your role...</div>}
                <hr />
                <div className="row">
                    <div className="col-12 text-center">
                        <img height="150px" width="150px" src={state.imageURL} alt="" />
                    </div>
                    <div className="col-12 row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="row my-2">
                                <div className="col-3 fw-bold">User Name: </div>
                                <div className="col-9 text-left ">
                                    {state.userName}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Full Name: </div>
                                <div className="col-9 text-left ">
                                    {state.fullName}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Phone Number: </div>
                                <div className="col-9 text-left ">
                                    {state.phoneNumber}
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-3 fw-bold">Role: </div>
                                <div className="col-9 text-left">
                                    <select className='form-select' aria-label="Default select example" onChange={handleSelectChange}>
                                        <option disabled selected>{patientInfo.role}</option>
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
                                <div className="col-3 fw-bold">Birth Date: </div>
                                <div className="col-9 text-left ">
                                    {state.birthDate}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Gender: </div>
                                <div className="col-9 text-left ">
                                    {state.gender}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Address: </div>
                                <div className="col-9 text-left ">
                                    {state.address}
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-3 fw-bold">Email: </div>
                                <div className="col-9 text-left ">
                                    {state.email}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-3 fw-bold">Confirm Email: </div>
                                <div className="col-9 text-left ">
                                    {state.emailConfirmed ?
                                        <button className="btn btn-primary"> Confirmed</button>
                                        :
                                        <button className="btn btn-danger">Not Confirmed</button>
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