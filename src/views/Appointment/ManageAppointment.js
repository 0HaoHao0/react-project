import { useEffect } from "react";
import { useState } from "react";
import { AppointmentAccept, AppointmentCancel, AppointmentComplete, AppointmentDoing, AppointmentGetAll, AppointmentGetId } from "../../services/AdminApiConnection/adminAppointmentApi";
import { DoctorAppointmentGetAll } from "../../services/Docter/doctorAppointment";
import { UserAppointmentGetAll } from "../../services/UserApiConnection/userAppointment";

function ManageAppointment(props) {

    const [data, setData] = useState([]);


    const [state, setState] = useState();

    const [appointmentData, setAppointmentData] = useState(null);

    const [appointmentIndex, setAppointmentIndex] = useState(null);

    let appointmentLink;

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
        // eslint-disable-next-line
    }, [props.user.id, state])

    useEffect(() => {
    })


    // Render Document
    const renderDocument = (documents) => {
        let render = [];
        documents.map((item, index) =>
            render.push(<>
                <option key={index} value={item.document.fileURL}>
                    {item.title}
                </option>
            </>)
        )
        return render;
    }

    // Handle Appointment
    const handleAppointment = async (id, index) => {
        await AppointmentGetId(id, (response) => {
            setAppointmentIndex(index);
            setAppointmentData(response.data);
        })
    }

    // Handle Accept
    const handleAccept = (id) => {

        AppointmentAccept(id, (response) => {
            let newData = [...data]
            newData[appointmentIndex] = response.data;
            setAppointmentData(response.data)
            setData(newData);
        })

    }
    // Handle Cancel
    const handleCancel = (id) => {

        AppointmentCancel(id, (response) => {
            let newData = [...data]
            newData[appointmentIndex] = response.data;
            setAppointmentData(response.data)
            setData(newData);
        })

    }
    // Handle Cancel
    const handleDoing = (id) => {

        AppointmentDoing(id, (response) => {
            let newData = [...data]
            newData[appointmentIndex] = response.data;
            setAppointmentData(response.data)
            setData(newData);
        })
    }
    // Handle Cancel
    const handleComplete = (id) => {

        AppointmentComplete(id, (response) => {
            let newData = [...data]
            newData[appointmentIndex] = response.data;
            setAppointmentData(response.data)
            setData(newData);
        })
    }
    //Convert Date
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = obj.split('T')[0]

            return date;
        }
    }


    let colors = {
        "NotYet": "warning",
        "Accept": "primary",
        "Cancel": "danger",
        "Doing": "info",
        "Complete": "success",
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
                                        <option value={1}>Doing</option>
                                        <option value={2}>Cancel</option>
                                        <option value={3}>Complete</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="appointment-list p-2">

                                {data.map((item, index) =>
                                    <div className={`card appointment-card my-2 border-${colors[item.state]} border-4`} key={index}
                                        onClick={() => handleAppointment(item.id, index)}>
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h6>{item.service.serviceName}</h6>
                                            </div>
                                            <div className="card-subtitle text-muted"><p>Docter: {item.doctor.baseUser.fullName}</p></div>
                                            <div className="card-subtitle text-muted"><p>Patient: {item.patient.baseUser.fullName}</p></div>
                                            <div className="card-text">
                                                <span>Create Date: {convertDate(item.timeCreated)}</span>
                                                <p>Meet Date: {convertDate(item.date)}</p>
                                                <p>Time: {item.time}</p>
                                            </div>
                                            <div className={`card-footer text-white bg-${colors[item.state]}`}>
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
                                            <div className="row px-5">
                                                <h3>Appointment Information: </h3>
                                                <div className="row m-2 ">
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
                                            <div className="row  px-5">
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
                                                        <label className="fw-bold mb-1">Certificate: </label>
                                                        <a className="mx-2" href={appointmentData.doctor.certificate.fileURL} rel="noreferrer" target='_Blank'>View</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row  px-5">
                                                <h3>Patient Information: </h3>
                                                <div className="row m-2">
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Full Name: </label> {appointmentData.patient.baseUser.fullName}
                                                        <br />
                                                        <label className="fw-bold my-1">Email: </label> {appointmentData.patient.baseUser.email}
                                                        <br />
                                                        <label className="fw-bold my-1">Phone Number: </label> {appointmentData.patient.baseUser.phoneNumber}
                                                        <br />
                                                        <label className="fw-bold my-1">Birth Date: </label> {convertDate(appointmentData.patient.baseUser.birthDate)}
                                                        <br />
                                                        <label className="fw-bold my-1">Gender: </label> {appointmentData.patient.baseUser.gender}
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="fw-bold mb-1">Medical record: </label> <a className="mx-2" href={appointmentData.patient.medicalRecordFile.fileURL} rel="noreferrer" target='_Blank'>View</a>
                                                        <br />
                                                        <label className="fw-bold my-1">Appointment record: </label>
                                                        <select class="form-select" aria-label="Default select example" onChange={(e) => { appointmentLink = e.target.value }}>
                                                            <option defaultValue="">Open this menu</option>
                                                            {renderDocument(appointmentData.documents)}
                                                        </select>
                                                        <span className="btn btn-primary my-1 me-2" onClick={() => { window.open(appointmentLink, "_blank").focus() }}>View</span>
                                                        {
                                                            props.user.role === "Administrator" || props.user.role === "Patient" || props.user.role === "Doctor"
                                                                ? <span className="btn btn-success my-1 me-2" onClick={() => { }}>Add</span>
                                                                : null
                                                        }
                                                        {
                                                            props.user.role === "Administrator" || props.user.role === "Receptionist"
                                                                ? <span className="btn btn-danger my-1" onClick={() => { }}>Delete</span>
                                                                : null
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            {appointmentData.state === "NotYet" && props.user.role === "Receptionist"
                                                ?
                                                <div className="ms-5">
                                                    <button className="btn btn-primary me-4" onClick={() => { handleAccept(appointmentData.id) }}>Accept</button>

                                                    <button className="btn btn-danger" onClick={() => { handleCancel(appointmentData.id) }}>Cancel</button>
                                                </div>
                                                :
                                                <></>
                                            }
                                            {
                                                appointmentData.state === "Accept" && props.user.role === "Doctor"
                                                    ?
                                                    <div className="ms-5">
                                                        <button className="btn btn-info me-4" onClick={() => { handleDoing(appointmentData.id) }}>Doing</button>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {
                                                appointmentData.state === "Doing" && props.user.role === "Doctor"
                                                    ?
                                                    <div className="ms-5">
                                                        <button className="btn btn-primary me-4" onClick={() => { handleComplete(appointmentData.id) }}>Complete</button>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            {props.user.role === "Administrator"
                                                ?
                                                <div className="ms-5">
                                                    <button className="btn btn-primary me-4" onClick={() => { handleAccept(appointmentData.id) }}>Accept</button>
                                                    <button className="btn btn-danger me-4" onClick={() => { handleCancel(appointmentData.id) }}>Cancel</button>
                                                    <button className="btn btn-info text-white me-4" onClick={() => { handleDoing(appointmentData.id) }}>Doing</button>
                                                    <button className="btn btn-success me-4" onClick={() => { handleComplete(appointmentData.id) }}>Complete</button>
                                                </div>
                                                :
                                                <></>
                                            }
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