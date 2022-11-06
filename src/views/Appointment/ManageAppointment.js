import { useEffect } from "react";
import { useState } from "react";
import { AppointmentGetAll } from "../../services/AdminApiConnection/adminAppointmentApi";
import { DoctorAppointmentGetAll } from "../../services/Docter/doctorAppointment";
import { UserAppointmentGetAll } from "../../services/UserApiConnection/userAppointment";

function ManageAppointment(props) {

    const [data, setData] = useState([]);


    const [state, setState] = useState();

    const [appointmentData, setAppointmentData] = useState(null);

    //Get data by user
    const getData = async (id, state) => {
        if (props.user.role === 'Administrator' || props.user.role === 'Receptionist') {
            await AppointmentGetAll(state, (response) => {
                setData(response.data.data);
            })
        }
        else if (props.user.role === 'Doctor') {
            await DoctorAppointmentGetAll(id, state, (response) => {
                setData(response.data.data);
            })
        }
        else if (props.user.role === 'Patient') {
            await UserAppointmentGetAll(id, state, (response) => {
                setData(response.data.data);
            })
        }

    }

    useEffect(() => {
        getData(props.user.id, state);
    }, [props.user.id, state])


    // Handle Appointment
    const handleAppointment = (appointment) => {
        console.log(appointment);
        setAppointmentData(appointment);
    }

    //Convert Date
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj).toISOString().split('T')[0]

            return date;
        }
    }


    return (
        <>
            <div >
                <div className="card m-5 p-5">
                    <div className="row">
                        <div className="col-12 col-lg-3 my-2 " >
                            <div className="row d-flex align-items-center">
                                <div className="col-7">

                                    <h3><i className="fa fa-list"></i> List</h3>
                                </div>
                                <div className="col-5">
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { e.target.value === 'null' ? setState(null) : setState(parseInt(e.target.value)) }}>
                                        <option value={'null'}>All</option>
                                        <option value={0}>Not Yet</option>
                                        <option value={1}>Accept</option>
                                        <option value={2}>Cancel</option>
                                        <option value={3}>Complete</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="appointment-list p-2">

                                {data.map((item, index) =>
                                    <div className={"card appointment-card my-2" + (item.state === 'NotYet' ? ' border-warning border-4'
                                        : item.state === 'Accept' ? ' border-primary border-4'
                                            : item.state === 'Cancel' ? ' border-danger border-4'
                                                : item.state === 'Complete' ? ' border-success border-4'
                                                    : ' ')
                                    } key={index}
                                        onClick={() => handleAppointment(item)}>
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h6>{item.service.serviceName}</h6>
                                            </div>
                                            <div className="card-subtitle text-muted"><p>Docter: {item.doctor.baseUser.fullName}</p></div>
                                            <div className="card-text">
                                                <p>Date: {convertDate(item.date)}</p>
                                                <p>Time: {item.time}</p>
                                            </div>
                                            <div className="card-footer ">
                                                <span>
                                                    <i className="fa-solid fa-lightbulb me-2"></i>
                                                    Status: {item.state}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                        <div className="col-12 col-lg-9 my-2 ">
                            <div className="row d-flex align-items-center">
                                <div className="col-12">
                                    <h3><i className="fa-solid fa-circle-info"></i> Detail</h3>
                                </div>
                            </div>
                            <hr />
                            <div className="appointment-detail">
                                {
                                    appointmentData !== null
                                        ?
                                        <div>
                                            <div className="row">
                                                <h3>Appointment Information: </h3>
                                                <div className="row m-2">
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Service Code: </label> {appointmentData.service.serviceCode}
                                                        <br />
                                                        <label className="fw-bold my-1">Service Name: </label> {appointmentData.service.serviceName}
                                                        <br />
                                                        <label className="fw-bold my-1">Service Price: </label> {appointmentData.service.price}
                                                        <br />
                                                        <label className="fw-bold my-1">Date: </label> {convertDate(appointmentData.date)}
                                                        <br />
                                                        <label className="fw-bold my-1">Time: </label> {appointmentData.time}
                                                        <br />
                                                        <label className="fw-bold my-1">Room: </label> {appointmentData.room.roomCode}
                                                        <br />
                                                        <label className="fw-bold my-1">Status: </label> {appointmentData.state}
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Content: </label>
                                                        <textarea className="form-control my-1" rows="5" defaultValue={appointmentData.content} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <h3>Docter Information: </h3>
                                                <div className="row m-2">
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Full Name: </label> {appointmentData.doctor.baseUser.fullName}
                                                        <br />
                                                        <label className="fw-bold my-1">Email: </label> {appointmentData.doctor.baseUser.email}
                                                        <br />
                                                        <label className="fw-bold my-1">Gender: </label> {appointmentData.doctor.baseUser.gender}
                                                        <br />
                                                        <label className="fw-bold my-1">Major: </label> {appointmentData.doctor.major.name}
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="fw-bold">Certificate: </label>
                                                        <a className="btn btn-primary mx-2" href={appointmentData.doctor.certificate.fileURL} rel="noreferrer" target='_Blank'>Link</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <h3>Patient Information: </h3>
                                                <div className="row m-2">
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Full Name: </label> {appointmentData.patient.baseUser.fullName}
                                                        <br />
                                                        <label className="fw-bold my-1">Email: </label> {appointmentData.patient.baseUser.email}
                                                        <br />
                                                        <label className="fw-bold my-1">Phone Number: </label> {appointmentData.patient.baseUser.phoneNumber}
                                                        <br />
                                                        <label className="fw-bold my-1">Address: </label> {appointmentData.patient.baseUser.address}
                                                        <br />
                                                        <label className="fw-bold my-1">Birth Date: </label> {convertDate(appointmentData.patient.baseUser.birthDate)}
                                                        <br />
                                                        <label className="fw-bold my-1">Gender: </label> {appointmentData.patient.baseUser.gender}
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="fw-bold">Medical record: </label>
                                                        <a className="btn btn-primary mx-2" href={appointmentData.patient.medicalRecordFile.fileURL} rel="noreferrer" target='_Blank'>Link</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageAppointment;