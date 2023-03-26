import moment from "moment";
import './ReceptionistAppointment.scss'
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAllAppointment } from "../../../services/receptionist/apiReceptionistAppointment";
import { useNavigate } from "react-router-dom";


function ReceptionistAppointmentQueue() {
    const navigate = useNavigate()

    const [appointmentData, setAppointmentData] = useState()

    const [fillter, setFillter] = useState(
        {
            startDate: moment().weekday(0).format(),
            endDate: moment().weekday(6).format(),
        }
    )


    const cardBorder =
    {
        'NotYet': 'border-warning ',
        'Accept': 'border-success',
        'Cancel': 'border-danger',
    }
    const cardHeader =
    {
        'NotYet': 'bg-warning ',
        'Accept': 'bg-success',
        'Cancel': 'bg-danger',
    }

    const cardBtn =
    {
        'NotYet': 'btn-warning ',
        'Accept': 'btn-success',
        'Cancel': 'btn-danger',
    }




    useEffect(() => {
        const loadData = async () => {


            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading()
            const res = await getAllAppointment(fillter);
            Swal.close()

            if (res.status === 200) {
                setAppointmentData(res.data)
            }
            else {
                toast.error('Server is busy !')
            }
        }

        loadData();

        return () => {

        }
    }, [fillter])


    return (<>
        <div className="receptionist-appointment-queue">
            <h1>Appointment Queue</h1>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-8 border shadow-sm">
                        <div className="container p-2">
                            <div className="row g-2 row-cols-lg-3 row-cols-md-2   row-cols-sm-1">
                                {
                                    appointmentData && (appointmentData.data.length !== 0
                                        ? appointmentData.data.map((value, index) =>
                                            <div className="col " key={value.id}>
                                                <div className={`card card-appointment h-100 ${cardBorder[value.state] || 'border-dark'}`}
                                                    onClick={() => navigate(`/receptionist/appointment-detail/${value.id}`)}
                                                >
                                                    <div className={`card-header ${cardHeader[value.state] || 'bg-dark text-white'}`}>
                                                        {value.patient.baseUser.fullName}
                                                    </div>
                                                    <div className='card-body overflow-auto'>
                                                        <h6 className="card-title">Doctor: {value.doctor.baseUser.fullName}</h6>
                                                        <h6 className="card-title">Service:  {value.service.serviceName}</h6>
                                                        <h6 className="card-title">Phone Number: <strong> {value.patient.baseUser.phoneNumber} </strong>  </h6>
                                                        <hr />
                                                        <p className="card-text">Date: {value.date.split("T")[0]}</p>
                                                        <p className="card-text">Time: {value.time}</p>
                                                        <button className={`btn btn-sm ${cardBtn[value.state] || 'btn-dark '} `} disabled>{value.state}</button>
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                        :
                                        <div className=" w-100 text-center my-5">
                                            <h1 >Appointment queue is empty...</h1>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="h-100">
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">Start Date: </label>
                                <input className="form-control" type="date" name="startDate" defaultValue={moment().weekday(0).format('YYYY-MM-DD')}
                                    onChange={(e) => { setFillter((preState) => ({ ...preState, [e.target.name]: e.target.value })) }} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">End Date: </label>
                                <input className="form-control" type="date" name="endDate" defaultValue={moment().weekday(6).format('YYYY-MM-DD')} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default ReceptionistAppointmentQueue;