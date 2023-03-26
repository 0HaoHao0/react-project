import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAppointment, updateAppointmentState } from '../../../services/receptionist/apiReceptionistAppointment';


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
            else {
                toast.error('Something was wrong, please contact to admin !')
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
                else {
                    toast.error("Update failed, please contact to Admin !")
                }
                MySwal.close()
            } else if (result.isDismissed) {
                toast.info('Update has been cancelled')
            }
        })
    }


    return (<>
        <div className="doctor-appointment-detail">
            <h1>Appointment Detail</h1>
            <hr />
            {appointmentInfo && <>
                <div className="alert alert-primary mb-2" role="alert">
                    Main Information
                </div>
                <div className="row g-2 ">
                    <div className="col ">
                        <div className="form-group">
                            <label htmlFor="id">Id:</label>
                            <input id="id" className="form-control" type="text" name="id" placeholder={appointmentInfo.id} disabled />
                            <label htmlFor="timeCreated">Time Created:</label>
                            <input id="timeCreated" className="form-control" type="text" name="timeCreated" placeholder={appointmentInfo.timeCreated.split('T')[0]} disabled />
                            <label htmlFor="lastModified">Last Modified:</label>
                            <input id="lastModified" className="form-control" type="text" name="lastModified"
                                placeholder={appointmentInfo.lastModified && appointmentInfo.lastModified.split('T')[0]} disabled />

                        </div>
                    </div>

                    <div className="col ">
                        <div className="form-group">

                            <label htmlFor="date">Date:</label>
                            <input id="date" className="form-control" type="text" name="date" placeholder={appointmentInfo.date.split("T")[0]} disabled />
                            <label htmlFor="start">Start:</label>
                            <input id="start" className="form-control" type="text" name="start" placeholder={appointmentInfo.from.split("T")[1]} disabled />
                            <label htmlFor="end">End:</label>
                            <input id="end" className="form-control" type="text" name="end" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                        </div>

                    </div>
                    <div className="col-12 ">
                        <div className="form-group text-primary">
                            <label htmlFor="state">State:</label>
                            <button className="btn btn-sm btn-primary mx-2" type="button" onClick={() => handleUpdateState(appointmentInfo.state)}>Update</button>

                            <input id="state" className="form-control my-2" type="text" name="state" placeholder={appointmentInfo.state} disabled />
                        </div>

                        <div className="form-group text-primary">

                            <label htmlFor="state">Document:</label >
                            <br />

                            <table className='table border sha-sm dow table-hover my-2 text-dark'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">Tag</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentInfo.documents.map((value, index) =>
                                        <tr key={value.id} >
                                            <th scope="row">{value.tag}</th>
                                            <td>{value.title}</td>
                                            <td><a href={value.file.fileURL} target='_blank' rel="noreferrer">View</a></td>
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
                                <span className="text-dark mx-2">Null</span>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" className="form-control" type="text" rows={5} name="content" placeholder={appointmentInfo.content} />
                        </div>
                    </div>

                </div>
                <div className="alert alert-secondary my-2" role="alert">
                    Patient
                </div>
                <div className="row g-0">
                    <div className="col d-flex justify-content-center align-items-center">
                        <img className="w-50" src={appointmentInfo.patient.baseUser.imageURL} alt="..." />
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
                <div className="alert alert-secondary my-2" role="alert">
                    Service
                </div>
                <div className="row g-0">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="service-name">User Name:</label>
                            <input id="service-name" className="form-control mb-2 bg-white" type="text" name="service-name" placeholder={appointmentInfo.service.serviceName} disabled />
                            <label htmlFor="service-code">Full Name:</label>
                            <input id="service-code" className="form-control mb-2 bg-white" type="text" name="service-code" placeholder={appointmentInfo.service.serviceCode} disabled />
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img className="w-50" src={appointmentInfo.service.imageURL} alt="..." />
                    </div>

                </div>
            </>}
        </div>
    </>);
}

export default ReceptionistAppointmentDetail;