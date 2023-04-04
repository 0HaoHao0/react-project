import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAppointment } from "../../services/receptionist/apiReceptionistAppointment";
import { toast } from "react-toastify";

function AppointmentDetail() {

    const { id } = useParams();

    const [appointmentInfo, setAppointmentInfo] = useState();

    useEffect(() => {

        const fetchData = async () => {

            Swal.fire({
                icon: "info",
                title: "Waiting to get data..."
            });
            Swal.showLoading();
            let res = await getAppointment(id);

            if(res.status === 200) {
                setAppointmentInfo(res.data);
            }
            else if(res.status < 500) {
                toast.error("Something wrong!");
            }

            Swal.close();
        }

        if(id != null) {
            fetchData();
        }

    }, [id]);

    const statusInfo = [
        { state: "NotYet", info: "Appointment is waiting until reception confirm." },
        { state: "Accept", info: "Appointment is accepted." },
        { state: "Cancel", info: "Appointment is canceled." },
        { state: "Doing", info: "The doctor is working with appointment." },
        { state: "Transfer", info: "Appointment is tranfered by doctor to technician." },
        { state: "TransferCancel", info: "Appointment is canceled by technician." },
        { state: "TransferDoing", info: "Technician is working with appointment" },
        { state: "TransferComplete", info: "Technician complete the task and send result to the doctor."},
        { state: "Complete", info: "Appointment is completed." },
    ]
    const handleStatusInfo = (data) => {
        statusInfo.forEach(element => {
            if (element.state === data) {
                Swal.fire({
                    icon: 'question',
                    title: element.state,
                    text: element.info,
                })
            }
        });
    }

    return (<>
        <div className="user-appointment-detail my-5 p-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 border shadow-sm">
                        <div className='p-5 '>
                            <h1 className="text-center">Appointment information</h1>
                        </div>

                        {appointmentInfo
                            ?
                            <>
                                {/* Key info */}
                                <div className='row justify-content-around'>
                                    <h2 className='col-12 alert alert-primary'>Key Information</h2>
                                    <div className='col-auto '>
                                        <div className="mb-3">
                                            <label htmlFor="date">Date: </label>
                                            <input id="date" className="form-control mb-2 bg-white" type="text" name="date" placeholder={appointmentInfo.date.split('T')[0]} disabled />
                                            <label htmlFor="form">Form: </label>
                                            <input id="form" className="form-control mb-2 bg-white" type="text" name="form" placeholder={appointmentInfo.from.split('T')[1]} disabled />
                                            <label htmlFor="to">To: </label>
                                            <input id="to" className="form-control mb-2 bg-white" type="text" name="to" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                                        </div>
                                    </div>
                                    <div className='col-auto'>
                                        <div className="mb-3">
                                            <label htmlFor="doctor-name">Doctor Name: </label>
                                            <input id="doctor-name" className="form-control mb-2 bg-white" type="text" name="doctor-name" placeholder={appointmentInfo.patient.baseUser.fullName} disabled />
                                            <label htmlFor="service-name">Service Name: </label>
                                            <input id="service-name" className="form-control mb-2 bg-white" type="text" name="service-name" placeholder={appointmentInfo.service.serviceName} disabled />
                                            <label htmlFor="room">Room Code: </label>
                                            <input id="room" className="form-control mb-2 bg-white" type="text" name="room" placeholder={appointmentInfo.room.roomCode} disabled />
                                        </div>
                                    </div>
                                </div>
                                {/* Appointment */}
                                <div className='row justify-content-around'>
                                    <div className='col-auto '>
                                        <div className="mb-3">
                                            <div className="mb-2 d-flex aligns-items-center gap-2">
                                                <label htmlFor="state">Status:</label>
                                                <div className=" badge rounded-pill bg-secondary"
                                                    onClick={() => handleStatusInfo(appointmentInfo.state)}
                                                >
                                                    <i className="fa fa-question" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <input id="state" className="form-control mb-2 bg-white" type="text" name="state" placeholder={appointmentInfo.state} disabled />
                                            <label htmlFor="lastTimeModified">Last Time Modified: </label>
                                            <input id="lastTimeModified" className="form-control mb-2 bg-white" type="text" name="lastTimeModified" placeholder={appointmentInfo.lastTimeModified && new Date(appointmentInfo.lastTimeModified).toLocaleString()} disabled />
                                        </div>
                                    </div>
                                    <div className='col-12 px-5'>
                                        <div className="mb-3">

                                            <label htmlFor="doctor-name">Content: </label>
                                            <textarea id="doctor-name" className="form-control mb-2 bg-white" rows={5} name="doctor-name" placeholder={appointmentInfo.content} disabled />

                                        </div>
                                    </div>
                                </div>
                                {/* Patient */}
                                <div className="row py-4">
                                    <h2 className="alert alert-secondary my-2" role="alert">
                                        Patient
                                    </h2>
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
                                {/* Doctor */}
                                <div className='row justify-content-around'>
                                    <h2 className='col-12 alert alert-secondary'>Doctor Profile</h2>
                                    <div className='col-auto '>
                                        <div className="mb-3">
                                            <label htmlFor="doctor-email">UserName:</label>
                                            <input id="doctor-email" className="form-control mb-2 bg-white" type="text" name="doctor-email" placeholder={appointmentInfo.doctor.baseUser.userName} disabled />
                                            <label htmlFor="doctor-fullName">Full Name:</label>
                                            <input id="doctor-fullName" className="form-control mb-2 bg-white" type="text" name="doctor-fullName" placeholder={appointmentInfo.doctor.baseUser.fullName} disabled />
                                            <label htmlFor="doctor-email">Phone:</label>
                                            <input id="doctor-email" className="form-control mb-2 bg-white" type="text" name="doctor-email" placeholder={appointmentInfo.doctor.baseUser.phoneNumber} disabled />                                       
                                        </div>
                                    </div>
                                    <img src={appointmentInfo.doctor.baseUser.imageURL} className='col-auto w-25 py-5 rounded' alt="..." />

                                </div>
                                {/* Service */}
                                <div className='row justify-content-around'>
                                    <h2 className='col-12 alert alert-secondary'>Service Information</h2>
                                    <img src={appointmentInfo.service.imageURL} className='col-auto w-25 py-5 rounded' alt="..." />
                                    <div className='col-auto '>
                                        <div className="mb-3">
                                            <label htmlFor="service-name">User Name:</label>
                                            <input id="service-name" className="form-control mb-2 bg-white" type="text" name="service-name" placeholder={appointmentInfo.service.serviceName} disabled />
                                            <label htmlFor="service-code">Full Name:</label>
                                            <input id="service-code" className="form-control mb-2 bg-white" type="text" name="service-code" placeholder={appointmentInfo.service.serviceCode} disabled />

                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='text-center m-5'>
                                    <i className="text-secondary">Waiting a moment...</i>
                                </div>
                            </>}


                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default AppointmentDetail;