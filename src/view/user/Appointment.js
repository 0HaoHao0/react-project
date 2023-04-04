import {
    Scheduler,
    WeekView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

import { Paper } from '@mui/material';
import './Appointment.scss'
import moment from 'moment';
import { useState } from 'react';
import { getAllAppointment } from '../../services/user/ApiAppointment';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function Appointment() {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState();


    const currentDate = moment().format();



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


    const myAppointment = (props) => {
        return (
            <Appointments.Appointment
                {...props}

                onClick={() => {
                    navigate(`/user/appointmentdetail/${props.data.id}`);
                }}>

            </Appointments.Appointment>
        );

    }

    return (<>
        <div className="appointment my-5">

            <div className="row g-0 p-5">

                <div className="col-12 border shadow-sm">
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