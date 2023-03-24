import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateMedicalRecord } from "../../../services/admin/patient/apiPatient";

function PatientDetail() {
    let { state } = useLocation();

    const [patientInfo, setPatientInfo] = useState(state);

    const [changeView, setChangeView] = useState(0)


    //Convert Date
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        } else {
            let date = obj.split("T")[0];
            return date;
        }
    };

    const handleUpdate = () => {
        Swal.fire({
            title: "Select a file",
            html: '<label htmlFor="DocumentFile" className="">Document File: </label> <span className="mx-2"> <a href={file} download>Sample</a></span>' +
                '<input type="file" id="custom-file" className="form-control ">',
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
                formData.append("File", file);

                Swal.fire({
                    title: "Loading...",
                    html: "Please wait a moment"
                })
                Swal.showLoading()
                const res = await updateMedicalRecord(formData);

                Swal.close()
                if (res.status === 200) {
                    setPatientInfo(res.data);
                    toast.success("Update Successful !");

                }
                else {
                    toast.error("Something was wrong, please contact to Admin !!!")
                }

            }
        });
    };
    return (<>
        <div className="doctor-detail">
            <div>
                <h1>Patient Profile</h1>
            </div>

            <hr />
            <div className="row g-0">
                <div className="col-lg-3 col-sm-12 ">
                    <div className="px-2">
                        <button className="btn btn-primary mb-2 w-100 text-left" onClick={() => { setChangeView(0) }}>Patient Profile</button>
                        <button className="btn btn-primary mb-2 w-100 text-left" onClick={() => { setChangeView(1) }}>Medical Record</button>
                    </div>
                </div>
                {changeView === 0 ?
                    <div className="col-lg-9 col-sm-12 ">
                        <h1 className="alert alert-dark ">Profile</h1>
                        <div className="container row">
                            <div className="col-12 text-center my-2">
                                <img height='150px' width='150px' src={state.baseUser.imageURL} alt="avatar" />
                            </div>
                            <div className="col-lg-6 col-sm-12 ">
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">User Name: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.userName} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Full Name: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.fullName} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Gender: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.gender} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Address: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.address} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Birth Date: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={convertDate(state.baseUser.birthDate)} disabled />
                                    </div>
                                </div>
                                {/*  */}

                            </div>
                            <div className="col-lg-6 col-sm-12">
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Phone Number: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.phoneNumber} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Email: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <input type="text" className="form-control bg-white" id="full-name" placeholder={state.baseUser.email} disabled />
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="full-name">Email Validated: </label>
                                    </div>
                                    <div className="col-md-8 ">
                                        <button className={`btn ${!state.baseUser.emailConfirmed ? 'btn-danger' : 'btn-success'}`} disabled> {!state.baseUser.emailConfirmed ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-check"></i>}</button>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="row g-0 align-items-center mb-2">
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
                        <h1 className="alert alert-dark ">Medical Record</h1>
                        <div className="container row">
                            <div className="form-group">
                                <label htmlFor="file">File:</label>
                                <a className="text-decoration-none mx-2" href={patientInfo.medicalRecordFile.fileURL} rel="noreferrer" target='_blank'>View</a>
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

export default PatientDetail;