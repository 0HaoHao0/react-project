import file from '../../assets/file/HospitalDocument.docx'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addDocument, deleteDocument, getAppointment, updateAppointmentState } from "../../services/doctor/DoctorApi";
import ImageSegmentationResults from '../technician/ImageSegmentationResults';
import { useCallback } from 'react';


function UpdateState({ currentState, handleChangeState }) {
    const appointmentState = [
        {
            id: 4,
            name: "Transfer"
        },
        {
            id: 3,
            name: "Doing"
        },
        {
            id: 8,
            name: "Complete"
        }
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

function UploadFile({ handleFile, handleTitle }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="Title">Tile: </label>
                <input id="Title" className="form-control mb-3" type="text" name="Title" onChange={(e) => { handleTitle(e.target.value) }} />
                <label htmlFor="DocumentFile ">Document File: </label> <span className='mx-2'><a href={file} download>Sample</a></span>
                <input id="DocumentFile " className="form-control" type="file" name="DocumentFile" accept='.docx' onChange={(e) => { handleFile(e.target.files[0]) }} />
            </div>
        </div>
    );
}



function DoctorAppointmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [appointmentInfo, setAppointmentInfo] = useState();
    const [loading, setLoading] = useState(0);
    const MySwal = withReactContent(Swal)

    const errorNavigate = useCallback(() => {
        navigate("/doctor/appointment-queue");
    }, [navigate])



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
                errorNavigate()
            }
            else {
                toast.error("Something wrong!");
            }
            Swal.close()
        }
        loadData()


    }, [id, loading, errorNavigate])

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
                    toast.error("Something wrong!");
                }
                MySwal.close()
            } else if (result.isDismissed) {
                toast.info('Update has been cancelled')
            }
        })
    }

    const handleUploadFile = () => {
        let data;


        const handleFile = (value) => {
            data = { ...data, DocumentFile: value }
        }

        const handleTitle = (value) => {
            data = { ...data, Title: value }
        }


        MySwal.fire({
            html: <UploadFile handleFile={handleFile} handleTitle={handleTitle} ></UploadFile>,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: "Update",
            icon: 'question',
        }).then(async (result) => {

            if (result.isConfirmed) {
                const fromData = new FormData();
                fromData.append('AppointmentId', appointmentInfo.id)
                fromData.append('DocumentFile', data.DocumentFile)
                fromData.append('Title', data.Title)
                MySwal.fire({
                    title: "Upload file...",
                    html: "Please wait a moment"
                })
                MySwal.showLoading()
                const res = await addDocument(fromData)
                if (res.status === 200) {
                    setLoading(loading + 1);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Something wrong!");
                }
                MySwal.close()
            } else if (result.isDismissed) {
                toast.info('Upload file has been cancelled')
            }
        })
    }

    const handleDetele = (id) => {
        MySwal.fire({
            title: 'Are you sure to delete this document ?',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: 'red',
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "Update Document...",
                    html: "Please wait a moment"
                })
                MySwal.showLoading()
                const res = await deleteDocument(id);

                if (res.status === 200) {
                    setLoading(loading + 1);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Something wrong!");
                }
                MySwal.close()
            } else if (result.isDismissed) {
                toast.info('Delete document has been cancelled')
            }
        })
    }
    return (<>
        <div className="doctor-appointment-detail p-5">
            <h1>Appointment Detail</h1>
            <hr />
            <div className='container-fluid'>

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
                                <button className="btn btn-sm btn-primary mx-2" type="button" onClick={(e) => { handleUploadFile() }}>Add</button>
                                <br />
                                {appointmentInfo.documents.length !== 0 ?
                                    (
                                        <table className='table border sha-sm dow table-hover my-2 text-dark'>
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
                                                {appointmentInfo.documents.map((value, index) =>
                                                    <tr key={value.id} >
                                                        <th scope="row">{value.id}</th>
                                                        <th scope="row">{value.tag}</th>
                                                        <td>{value.title}</td>
                                                        <td>
                                                            <a href={value.file.fileURL} target='_blank' rel="noreferrer">View</a>
                                                        </td>
                                                        <td>{new Date(value.file.timeCreated).toLocaleString()}</td>
                                                        <td>
                                                            <button className='btn btn-sm btn-danger' onClick={() => handleDetele(value.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>)
                                    :
                                    null
                                }

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
                        <div className="col-12">
                            <ImageSegmentationResults appointmentId={appointmentInfo.id} showLoading={true} canDelete={false} />
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
                    <h2 className="alert alert-secondary my-2" role="alert">
                        Doctor Profile
                    </h2>
                    {/* Doctor */}
                    <div className="row g-0 py-4">
                        <div className="col d-flex justify-content-center align-items-center">
                            <img className="w-50 rounded border" src={appointmentInfo.service.imageURL} alt="..." />
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

export default DoctorAppointmentDetail;