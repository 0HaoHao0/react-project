import {
    Scheduler,
    WeekView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Appointment.scss'
import moment from 'moment';
import { useState } from 'react';
import { getAllAppointment } from '../../services/user/ApiAppointment';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



function Appointment() {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState();

    const [appointmentInfo, setAppointmentInfo] = useState();

    const currentDate = moment().format();

    const statusInfo = [
        { state: "NotYet", info: "Appointment is not confirm." },
        { state: "Accept", info: "Appointment is accept for doctor." },
        { state: "Cancel", info: "Appointment is cancel." },
        { state: "Doing", info: "Appointment is tranfer to reception." },
        { state: "Transfer", info: "Appointment is tranfer to technician." },
        { state: "TransferCancel", info: "Technician is cancel this appointment." },
        { state: "TransferDoing", info: "Technician is doing the appointment" },
        { state: "TransferComplete", info: "Technician is complete the appointment" },
        { state: "Complete", info: "Appointment is complete" },
    ]

    const loadAppointment = async () => {
        Swal.fire({
            title: "Loading...",
            html: "Please wait a moment"
        })
        Swal.showLoading()

        const res = await getAllAppointment();

        Swal.close()

        const updatedAppointments = res.data.data.map((appointment) => {
            return {
                ...appointment,
                title: appointment.doctor.baseUser.fullName,
                startDate: appointment.from,
                endDate: appointment.to
            };
        });
        setAppointment(updatedAppointments);
    }


    useEffect(() => {
        loadAppointment();
        return () => {

        }
    }, [])

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

    const myAppointment = (props) => {
        return (
            <Appointments.Appointment
                {...props}

                onClick={() => {
                    console.log(props.data);
                    setAppointmentInfo(props.data)
                }}>

            </Appointments.Appointment>
        );

    }

    return (<>
        <div className="appointment">
            <button className="btn btn-danger btn-back" type="button" onClick={() => { navigate(-1) }}><i className="fa-solid fa-backward"></i> Back</button>

            <div className="row g-0 p-5">
                <div className="col-sm-12 col-lg-6 border shadow-sm ">
                    <div className='p-5 '>
                        <h6 className="text-center">Appointment information</h6>
                    </div>

                    {appointmentInfo
                        ?
                        <>
                            {/* Key info */}
                            <div className='row justify-content-around'>
                                <h1 className='col-12 alert alert-primary'>Key Information</h1>
                                <div className='col-auto '>
                                    <div className="form-group">
                                        <label htmlFor="date">Date: </label>
                                        <input id="date" className="form-control mb-2 bg-white" type="text" name="date" placeholder={appointmentInfo.date.split('T')[0]} disabled />
                                        <label htmlFor="form">Form: </label>
                                        <input id="form" className="form-control mb-2 bg-white" type="text" name="form" placeholder={appointmentInfo.from.split('T')[1]} disabled />
                                        <label htmlFor="to">To: </label>
                                        <input id="to" className="form-control mb-2 bg-white" type="text" name="to" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                                    </div>
                                </div>
                                <div className='col-auto'>
                                    <div className="form-group">
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
                                <h1 className='col-12 alert alert-dark'>Appointment Information</h1>

                                <div className='col-auto '>
                                    <div className="form-group">
                                        <label htmlFor="state" onClick={() => handleStatusInfo(appointmentInfo.state)}>Status:
                                            <i className=' badge rounded-pill bg-secondary fa-solid fa-question mx-1'></i>
                                        </label>
                                        <input id="state" className="form-control mb-2 bg-white" type="text" name="state" placeholder={appointmentInfo.state} disabled />
                                        <label htmlFor="lastTimeModified">Last Time Modified: </label>
                                        <input id="lastTimeModified" className="form-control mb-2 bg-white" type="text" name="lastTimeModified" placeholder={appointmentInfo.lastTimeModified && appointmentInfo.lastTimeModified.split('T')[0]} disabled />

                                    </div>
                                </div>
                                <div className='col-12 px-5'>
                                    <div className="form-group">

                                        <label htmlFor="doctor-name">Content: </label>
                                        <textarea id="doctor-name" className="form-control mb-2 bg-white" rows={5} name="doctor-name" placeholder={appointmentInfo.content} disabled />

                                    </div>
                                </div>
                            </div>
                            {/* Patient */}
                            <div className='row justify-content-around'>
                                <h1 className='col-12 alert alert-secondary'>Patient Profile</h1>
                                <img src={appointmentInfo.patient.baseUser.imageURL} className='col-auto w-25 py-5 ' alt="..." />
                                <div className='col-auto '>
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
                                <h1 className='col-12 alert alert-secondary'>Doctor Profile</h1>
                                <div className='col-auto '>
                                    <div className="form-group">

                                        <label htmlFor="doctor-fullName">Full Name:</label>
                                        <input id="doctor-fullName" className="form-control mb-2 bg-white" type="text" name="doctor-fullName" placeholder={appointmentInfo.doctor.baseUser.fullName} disabled />
                                        <label htmlFor="doctor-email">Email:</label>
                                        <input id="doctor-email" className="form-control mb-2 bg-white" type="text" name="doctor-email" placeholder={appointmentInfo.doctor.baseUser.email} disabled />
                                        <label htmlFor="doctor-major">Major:</label>
                                        <input id="doctor-major" className="form-control mb-2 bg-white" type="text" name="doctor-major" placeholder={appointmentInfo.doctor.major} disabled />
                                    </div>
                                </div>
                                <img src={appointmentInfo.doctor.baseUser.imageURL} className='col-auto w-25 py-5 ' alt="..." />

                            </div>
                            {/* Service */}
                            <div className='row justify-content-around'>
                                <h1 className='col-12 alert alert-secondary'>Service Information</h1>
                                <img src={appointmentInfo.service.imageURL} className='col-auto w-25 py-5 ' alt="..." />
                                <div className='col-auto '>
                                    <div className="form-group">
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
                                Please select appointment to display information...
                            </div>
                        </>}


                </div>
                <div className="col-sm-12 col-lg-6 border shadow-sm">
                    <div className='p-5'>
                        <h6 className="text-center">Schedule</h6>
                        <Paper>
                            <Scheduler
                                data={appointment}
                            >
                                <ViewState
                                    defaultCurrentDate={currentDate}
                                />
                                <WeekView
                                    startDayHour={8}
                                    endDayHour={17}
                                />
                                <Appointments
                                    appointmentComponent={myAppointment}
                                />

                            </Scheduler>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Appointment;