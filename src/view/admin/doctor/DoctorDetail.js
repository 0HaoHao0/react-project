import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateDoctor } from "../../../services/admin/doctor/apiDoctor";

function DoctorDetail() {
    const { state } = useLocation()

    const [doctorInfo, setDoctorInfo] = useState(state)

    const [changeView, setChangeView] = useState(0)


    const handleUpdate = () => {
        Swal.fire({
            title: "Select a file",
            html: '<input type="file" id="custom-file" class="form-control bg-white" accept="application/pdf">',
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
            focusConfirm: false,
            preConfirm: () => {
                const file = document.getElementById("custom-file").files[0];
                if (!file) {
                    Swal.showValidationMessage("You need to choose a file");
                }
                return { file: file };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const file = result.value.file;
                // Handle file here
                let formData = new FormData();
                formData.append("Id", state.id);
                formData.append("CertificateFile", file);

                Swal.fire({
                    title: "Loading...",
                    html: "Please wait a moment"
                })
                Swal.showLoading()
                const res = await updateDoctor(formData);
                setDoctorInfo(res.data);

                Swal.close()
                toast.success("Update Successful !");
            }
        });
    };
    return (<>
        <div className="doctor-detail">
            <div>
                <h1>Doctor Profile</h1>
            </div>
            <hr />
            <div className="row g-0">
                <div className="col-lg-3 col-sm-12 my-2">
                    <div className="px-2">
                        <button className="btn btn-primary mb-2 w-100 text-left" onClick={() => { setChangeView(0) }}>Doctor Profile</button>
                        <button className="btn btn-primary mb-2 w-100 text-left" onClick={() => { setChangeView(1) }}>Certificate</button>
                    </div>
                </div>
                {changeView === 0 ?
                    <div className="col-lg-9 col-sm-12 ">
                        <h1 className="alert alert-dark my-2">Profile</h1>
                        <div className="container row">
                            <div className="col-12 text-center my-2">
                                <img height='150px' width='150px' src={state.baseUser.imageURL} alt="avatar" />
                            </div>
                            <div className="col-lg-6 col-sm-12 ">
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">User Name: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.userName} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Full Name: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.fullName} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Gender: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.gender} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Address: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.address} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Birth Date: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.birthDate} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Major: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.major} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Phone Number: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.phoneNumber} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Email: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.email} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Email Validated: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <button className={`btn ${!state.baseUser.emailConfirmed ? 'btn-danger' : 'btn-success'}`} disabled> {!state.baseUser.emailConfirmed ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-check"></i>}</button>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Lock: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <button className={`btn ${!state.baseUser.isLock ? 'btn-success' : 'btn-danger'}`} disabled> {!state.baseUser.isLock ? <i className="fa-solid fa-lock-open"></i> : <i className="fa-solid fa-lock"></i>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-lg-9 col-sm-12 ">
                        <h1 className="alert alert-dark my-2">Certificate</h1>
                        <div className="container row">
                            <div className="row align-items-center mb-2">
                                <div className="form-group">
                                    <label htmlFor="file">File:</label>
                                    <a className="text-decoration-none mx-2" href={doctorInfo.certificate.fileURL} rel="noreferrer" target='_blank'>View</a>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary my-2" onClick={() => { handleUpdate() }}>
                            Update File
                        </button>
                    </div>
                }

            </div>
        </div>
    </>);
}

export default DoctorDetail;