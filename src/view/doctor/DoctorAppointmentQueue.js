import { useState } from "react";
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

import { Paper } from '@mui/material';
import moment from 'moment';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllAppointment } from "../../services/doctor/DoctorApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//Week Picker
import { Calendar } from 'primereact/calendar';

function DoctorAppointmentQueue() {
    const [appointment, setAppointment] = useState();

    const [date, setDate] = useState(moment().format("yyyy-MM-DD"))

    const user = useSelector((state) => state.user);


    const [filter, setFiter] = useState({
        id: user.userInfo.id,
        startDate: date,
        endDate: moment(date).add(24, 'hours').format(),
    });

    // const statusInfo = [
    //     { state: "NotYet", info: "Appointment is not confirm." },
    //     { state: "Accept", info: "Appointment is accept for doctor." },
    //     { state: "Cancel", info: "Appointment is cancel." },
    //     { state: "Doing", info: "Appointment is tranfer to reception." },
    //     { state: "Transfer", info: "Appointment is tranfer to technician." },
    //     { state: "TransferCancel", info: "Technician is cancel this appointment." },
    //     { state: "TransferDoing", info: "Technician is doing the appointment" },
    //     { state: "TransferComplete", info: "Technician is complete the appointment" },
    //     { state: "Complete", info: "Appointment is complete" },
    // ]




    useEffect(() => {
        const loadAppointment = async () => {
            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment",
                allowOutsideClick: false,
            })
            Swal.showLoading()

            const res = await getAllAppointment(filter);

            Swal.close()

            if (res.status !== 200) {
                toast.error("Something was wrong, please try again !!!")
            }

            const updatedAppointments = res.data.data.map((appointment) => {
                return {
                    ...appointment,
                    title: appointment.patient.baseUser.fullName,
                    startDate: appointment.from,
                    endDate: appointment.to
                };
            });
            setAppointment(updatedAppointments);
        }
        loadAppointment();
        return () => {

        }
    }, [filter])



    const Content = (({
        appointmentData, ...restProps
    }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <hr />
            <div className="container g-0 align-items-center my-2">
                <div className="row g-0 ">
                    <div className="col-2 text-center">
                        <i className="fa-solid fa-phone "></i>
                    </div>
                    <div className="col-10">
                        {appointmentData.patient.baseUser.phoneNumber}
                    </div>
                </div>
            </div>
            <div className="container g-0 align-items-center my-2">
                <div className="row g-0 ">
                    <div className="col-2 text-center">
                        <i className="fa-solid fa-file-lines"></i>
                    </div>
                    <div className="col-10">
                        {appointmentData.state}
                    </div>
                </div>
            </div>
            <hr />
            <div className="container g-0 align-items-center my-2">
                <div className="row g-0 ">
                    <Link to={`/doctor/appointment-detail/${appointmentData.id}`} className="btn btn-success">
                        Detail
                    </Link>
                </div>
            </div>

        </AppointmentTooltip.Content>
    ));

    return (<>
        <div className="doctor-appointment-queue ">
            <h1>Appointment Queue</h1>
            <hr />
            <div className="container-fluid">

                <div className="row  overflow-auto  ">
                    <div className="col-5  border shadow-sm">
                        <h4 className="text-center p-4">Week Picker</h4>

                        <Calendar className="w-100" value={date} onChange={(e) => {
                            setDate(e.value);
                            setFiter({ startDate: moment(e.value).format("yyyy-MM-DD"), endDate: moment(e.value).add(24, 'hours').format() })
                        }} inline />

                    </div>

                    <div className="col-7 border shadow-sm">
                        <h4 className="text-center p-4">Schedule</h4>
                        <div className=''>

                            <Paper className="shadow">
                                <Scheduler
                                    data={appointment}

                                >
                                    <ViewState
                                        currentDate={date}
                                    />
                                    <DayView
                                        startDayHour={8}
                                        endDayHour={18}
                                    />
                                    <Appointments />
                                    <AppointmentTooltip
                                        showCloseButton
                                        contentComponent={Content}
                                    />

                                </Scheduler>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default DoctorAppointmentQueue;