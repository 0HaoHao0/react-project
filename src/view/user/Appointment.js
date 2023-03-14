import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';

import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Appointment.scss'
import moment from 'moment';
import { useState } from 'react';
import { getAllAppointment } from '../../services/user/ApiAppointment';
import { useEffect } from 'react';



function Appointment() {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState();

    const currentDate = moment().format();

    const loadAppointment = async () => {
        const res = await getAllAppointment();

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
                    console.log(props.data);
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