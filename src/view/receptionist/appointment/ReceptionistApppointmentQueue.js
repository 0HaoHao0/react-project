import moment from "moment";
import './ReceptionistAppointment.scss'
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAllAppointment, getAppointmentStates } from "../../../services/receptionist/apiReceptionistAppointment";
import { useNavigate } from "react-router-dom";


function ReceptionistAppointmentQueue() {
    const navigate = useNavigate()

    const [appointmentData, setAppointmentData] = useState()


    const [fillter, setFillter] = useState(
        {
            page: -1,
            startDate: moment().weekday(0).format(),
            endDate: moment().weekday(6).format(),
            phoneNumber: null,
            userName: null,
            state: null,
        }
    )

    const [appointmentStateList, setAppointmentStateList] = useState([]);

    useEffect(() => {

        const doEffect = async () => {
            let res = await getAppointmentStates();
            if (res.status === 200) {
                setAppointmentStateList(res.data);
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something went wrong, please try again !!!")
            }
        }

        doEffect();

    }, []);

    const cardBorder =
    {
        'NotYet': 'border-warning ',
        'Accept': 'border-success',
        'Cancel': 'border-danger',
    }
    const cardHeader =
    {
        'NotYet': 'bg-warning text-white',
        'Accept': 'bg-success  text-white',
        'Cancel': 'bg-danger  text-white',
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
                const dataByDate = res.data.data.reduce((acc, cur) => {
                    const date = cur.date.split('T')[0];
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(cur);
                    return acc;
                }, {});

                setAppointmentData((preState) => ({
                    ...res.data,
                    data: dataByDate
                }));



            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something went wrong, please try again !!!")
            }
        }

        loadData();

        return () => {

        }
    }, [fillter])


    return (<>
        <div className="receptionist-appointment-queue  p-5">
            <h1>Appointment Queue</h1>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-8 border shadow-sm">
                        <div className="container p-2">
                            <div className="">
                                {appointmentData && Object.entries(appointmentData.data).reverse().map(([key, value]) => {
                                    return (
                                        <div className="my-2" key={key}>
                                            <div className="alert alert-dark" role="alert" >
                                                <strong>{key} </strong>
                                            </div>
                                            <div className="row g-2 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 ">

                                                {
                                                    value.map((item, index) =>
                                                        <div className="col " key={item.id}>
                                                            <div className={`card card-appointment h-100 ${cardBorder[item.state] || 'border-dark'}`}

                                                            >
                                                                <div className={`card-header d-flex align-items-center justify-content-between ${cardHeader[item.state] || 'bg-dark text-white'}`}>
                                                                    {item.patient.baseUser.fullName} <button className='btn btn-sm btn-success text-end'
                                                                        onClick={() => navigate(`/receptionist/appointment-detail/${item.id}`)}>Detail</button>
                                                                </div>
                                                                <div className='card-body overflow-auto'>
                                                                    <h6 className="card-title">Id: {item.id}</h6>
                                                                    <h6 className="card-title">User: {item.patient.baseUser.userName}</h6>
                                                                    <h6 className="card-title">Doctor: {item.doctor.baseUser.fullName}</h6>
                                                                    <h6 className="card-title">Service:  {item.service.serviceName}</h6>
                                                                    <h6 className="card-title">Phone Number: <strong> {item.patient.baseUser.phoneNumber} </strong>  </h6>
                                                                    <hr />
                                                                    <p className="card-text">Date: {item.date.split("T")[0]}</p>
                                                                    <p className="card-text">Time: {item.time}</p>
                                                                    <button className={`btn btn-sm ${cardBtn[item.state] || 'btn-dark '} `} disabled>{item.state}</button>

                                                                </div>
                                                            </div>
                                                        </div>)
                                                }
                                                <div />
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="h-100">
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">Phone Number: </label>
                                <input className="form-control" type="text" placeholder="Search by PhoneNumber"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFillter({
                                                ...fillter,
                                                phoneNumber: e.target.value
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">Patient User Name: </label>
                                <input className="form-control" type="text" placeholder="Search by UserName"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFillter({
                                                ...fillter,
                                                userName: e.target.value
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label" id="">Filter by State:</label>
                                <select className="text-secondary form-control">
                                    <option>Choose State</option>
                                    {
                                        appointmentStateList.map(item =>
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <hr />
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">Start Date: </label>
                                <input className="form-control" type="date" name="startDate" defaultValue={moment().weekday(0).format('YYYY-MM-DD')}
                                    onChange={(e) => { setFillter((preState) => ({ ...preState, [e.target.name]: e.target.value })) }} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label" id="my-addon">End Date: </label>
                                <input className="form-control" type="date" name="endDate" defaultValue={moment().weekday(6).format('YYYY-MM-DD')}
                                    onChange={(e) => { setFillter((preState) => ({ ...preState, [e.target.name]: e.target.value })) }} />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default ReceptionistAppointmentQueue;