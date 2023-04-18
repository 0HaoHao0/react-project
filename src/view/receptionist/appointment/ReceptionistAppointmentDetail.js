import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAppointment, removeDocument, updateAppointmentState } from '../../../services/receptionist/apiReceptionistAppointment';


function UpdateState({ currentState, handleChangeState }) {
    const appointmentState = [
        {
            id: 1,
            name: "Accept"
        },
        {
            id: 2,
            name: "Cancel"
        },

    ];

    return (
        <div className="row g-0">
            <div className="col-12 my-2">Update State</div>
            <div className="col-12">
                <select className='form-select' defaultValue={currentState} onChange={(e) => handleChangeState(e.target.value)}>
                    <option disabled value={currentState} >{currentState}</option>
                    {appointmentState.map(option => (
                        <option
                            key={option.id}
                            value={option.id}
                            hidden={option.name === currentState}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}


function ReceptionistAppointmentDetail() {
    const { id } = useParams();
    const [appointmentInfo, setAppointmentInfo] = useState();
    const [loading, setLoading] = useState(0);
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const loadData = async () => {
            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading()
            const res = await getAppointment(id);
            if (res.status === 200) {
                setAppointmentInfo(res.data)
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error('Something went wrong, Please try again !!!');
            }
            Swal.close()
        }
        loadData()

        return () => {

        }
    }, [id, loading])

    const handleUpdateState = (currentState) => {
        let state;

        const handleChangeState = (e) => {
            state = e;
        }

        MySwal.fire({
            html: <UpdateState currentState={currentState} handleChangeState={handleChangeState}></UpdateState>,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: "Update",
            icon: 'question',
        }).then(async (result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "Update State...",
                    html: "Please wait a moment"
                })
                MySwal.showLoading()
                const res = await updateAppointmentState(appointmentInfo.id, state);

                if (res.status === 200) {
                    setLoading(loading + 1);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Update failed, please contact to Admin !")
                }
                MySwal.close()
            } else if (result.isDismissed) {
                toast.info('Update has been cancelled')
            }
        })
    }




    const handleRemoveDocument = async (id) => {

        const showRemoveQuestion = (doConfirmed) => {
            Swal.fire({
                icon: "question",
                title: "Confirm delete document!",
                text: "You can not revert data!",
                showConfirmButton: true,
                showCancelButton: true
            })
                .then(ans => {
                    if (ans.isConfirmed) {
                        doConfirmed();
                    }
                })
        }

        showRemoveQuestion(async () => {

            Swal.fire({
                icon: "info",
                title: "Waiting for remove data!",
            });
            Swal.showLoading();
            let res = await removeDocument(id);
            if (res.status === 200) {
                toast.success(res.data);

                let _tempAppInfo = appointmentInfo;
                _tempAppInfo.documents = _tempAppInfo.documents.filter(x => x.id !== id);
                setAppointmentInfo({
                    ..._tempAppInfo
                });
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something wrong!");
            }

            Swal.close();
        });
    }


    return (<>
        <div className="doctor-appointment-detail p-5">
            <h1>Appointment Detail</h1>
            <hr />
            <div className="container-fluid">

                {appointmentInfo && <>
                    <h2 className="alert alert-primary mb-2" role="alert">
                        Main Information
                    </h2>
                    <div className="row g-2 ">
                        <div className="col ">
                            <div className="form-group">
                                <label htmlFor="id">Id:</label>
                                <input id="id" className="form-control" type="text" name="id" placeholder={appointmentInfo.id} disabled />
                                <label htmlFor="timeCreated">Created:</label>
                                <input id="timeCreated" className="form-control" type="text" name="timeCreated"
                                    placeholder={new Date(appointmentInfo.timeCreated).toLocaleString()} disabled />
                                <label htmlFor="lastTimeModified">Last Modified: </label>
                                <input id="lastTimeModified" className="form-control" type="text" name="lastTimeModified"
                                    placeholder={appointmentInfo.lastTimeModified && new Date(appointmentInfo.lastTimeModified).toLocaleString()} disabled />
                            </div>
                        </div>
                        <div className="col ">
                            <div className="form-group">

                                <label htmlFor="date">Required Date:</label>
                                <input id="date" className="form-control" type="text" name="date" placeholder={appointmentInfo.date.split("T")[0]} disabled />
                                <label htmlFor="start">Start:</label>
                                <input id="start" className="form-control" type="text" name="start" placeholder={appointmentInfo.from.split("T")[1]} disabled />
                                <label htmlFor="end">End:</label>
                                <input id="end" className="form-control" type="text" name="end" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                            </div>
                        </div>
                        <hr />
                        <div className="col-12 ">
                            <div className="form-group text-primary">
                                <label htmlFor="state">State:</label>
                                <button className="btn btn-sm btn-primary mx-2" type="button" onClick={() => handleUpdateState(appointmentInfo.state)}>Update</button>

                                <input id="state" className="form-control my-2" type="text" name="state" placeholder={appointmentInfo.state} disabled />
                            </div>

                            <div className="form-group text-primary">

                                <label htmlFor="state">Document:</label >
                                <br />

                                <table className='table border shadow-sm table-hover my-2 text-dark text-center'>
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Uploader</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">File</th>
                                            <th scope="col">Upload At</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentInfo.documents.map(value =>
                                            <tr key={value.id}>
                                                <th scope="row">{value.id}</th>
                                                <th scope="row">{value.tag}</th>
                                                <td>{value.title}</td>
                                                <td>
                                                    <a href={value.file.fileURL} target='_blank' rel="noreferrer">View</a>
                                                </td>
                                                <td>{new Date(value.file.timeCreated).toLocaleString()}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={(e) => {
                                                        handleRemoveDocument(value.id);
                                                    }}>
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>

                            </div>
                            <div className="form-group text-primary">

                                <label htmlFor="state">Medical Record:</label >
                                {appointmentInfo.patient.medicalRecordFile.fileURL
                                    ?
                                    <a href={appointmentInfo.patient.medicalRecordFile.fileURL} className="btn-sm btn-dark mx-2" target={'_blank'} rel="noreferrer"  >View</a>

                                    :
                                    <span className="text-secondary mx-2">No file uploaded.</span>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="content">Content:</label>
                                <textarea id="content" className="form-control" type="text" rows={5} name="content" placeholder={appointmentInfo.content} />
                            </div>
                        </div>

                    </div>
                    <h2 className="alert alert-secondary my-2" role="alert">
                        Patient
                    </h2>
                    <div className="row g-0 py-4">
                        <div className="col d-flex justify-content-center align-items-center">
                            <img className="w-50 rounded border" src={appointmentInfo.patient.baseUser.imageURL} alt="..." />
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="patient-username">User Name:</label>
                                <input id="patient-username" className="form-control mb-2 bg-white" type="text" name="patient-username" placeholder={appointmentInfo.patient.baseUser.userName} disabled />
                                <label htmlFor="patient-fullName">Full Name:</label>
                                <input id="patient-fullName" className="form-control mb-2 bg-white" type="text" name="patient-fullName" placeholder={appointmentInfo.patient.baseUser.fullName} disabled />
                                <label htmlFor="patient-email">Email:</label>
                                <input id="patient-email" className="form-control mb-2 bg-white" type="text" name="patient-email" placeholder={appointmentInfo.patient.baseUser.email} disabled />
                                <label htmlFor="patient-phoneNumber">Phone Number:</label>
                                <input id="patient-phoneNumber" className="form-control mb-2 bg-white" type="text" name="patient-phoneNumber" placeholder={appointmentInfo.patient.baseUser.phoneNumber} disabled />
                            </div>
                        </div>
                    </div>
                    <h2 className="alert alert-secondary my-2" role="alert">
                        Service
                    </h2>
                    <div className="row g-0 py-4">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="service-name">ServiceName:</label>
                                <input id="service-name" className="form-control mb-2 bg-white" type="text" name="service-name" placeholder={appointmentInfo.service.serviceName} disabled />
                                <label htmlFor="service-code">ServiceCode:</label>
                                <input id="service-code" className="form-control mb-2 bg-white" type="text" name="service-code" placeholder={appointmentInfo.service.serviceCode} disabled />
                            </div>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <img className="w-50 rounded border" src={appointmentInfo.service.imageURL} alt="..." />
                        </div>

                    </div>
                    {/* Doctor */}
                    <h2 className="alert alert-secondary my-2" role="alert">
                        Doctor Profile
                    </h2>
                    <div className="row g-0 py-4">
                        <div className="col d-flex justify-content-center align-items-center">
                            <img className="w-50 rounded border" src={appointmentInfo.doctor.baseUser.imageURL} alt="..." />
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="service-name">User Name:</label>
                                <input id="service-name" className="form-control mb-2 bg-white" type="text" name="service-name"
                                    placeholder={appointmentInfo.doctor.baseUser.userName} disabled />
                                <label htmlFor="service-code">Full Name:</label>
                                <input id="service-code" className="form-control mb-2 bg-white" type="text" name="service-code"
                                    placeholder={appointmentInfo.doctor.baseUser.fullName} disabled />
                            </div>
                        </div>

                    </div>
                </>}
            </div>
        </div>
    </>);
}

export default ReceptionistAppointmentDetail;