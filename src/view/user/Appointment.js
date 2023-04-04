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
import { toast } from 'react-toastify';



function Appointment() {
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState();
    const currentDate = moment().format();
    useEffect(() => {

        const loadAppointment = async () => {
            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading();
            let nowDate = new Date();
            let startOfWeek = new Date(nowDate.setDate(nowDate.getDate() - nowDate.getDay()));
            let endOfWeek = new Date(nowDate.setDate(nowDate.getDate() - nowDate.getDay() + 6));
            let filter = {
                startDate: startOfWeek.toISOString().split("T")[0],
                endDate: endOfWeek.toISOString().split("T")[0],
            }
            const res = await getAllAppointment({
                params: filter
            });
            if(res.status === 200) {
                console.log(res.data);
                const updatedAppointments = res.data.data.map((appointment) => ({
                        ...appointment,
                        title: appointment.doctor.baseUser.fullName,
                        startDate: appointment.from,
                        endDate: appointment.to
                    }));
    
                setAppointment(updatedAppointments);
            }
            else {
                toast.error("Something wrong!");
            }
    
            Swal.close();
            
        }

        loadAppointment();
    }, []);


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