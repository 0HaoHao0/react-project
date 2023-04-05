import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAppointment } from "../../services/receptionist/apiReceptionistAppointment";
import { toast } from "react-toastify";
import { Rating } from 'primereact/rating';
import { feedbackAppointment } from "../../services/admin/user/apiUser";


function AppointmentDetail() {

    const { id } = useParams();

    const [appointmentInfo, setAppointmentInfo] = useState();

    const [feedback, setFeedback] = useState(
        {
            ratingPoint: 0,
            content: '',
        }
    );

    const statusInfo = [
        { state: "NotYet", info: "Appointment is waiting until reception confirm." },
        { state: "Accept", info: "Appointment is accepted." },
        { state: "Cancel", info: "Appointment is canceled." },
        { state: "Doing", info: "The doctor is working with appointment." },
        { state: "Transfer", info: "Appointment is tranfered by doctor to technician." },
        { state: "TransferCancel", info: "Appointment is canceled by technician." },
        { state: "TransferDoing", info: "Technician is working with appointment" },
        { state: "TransferComplete", info: "Technician complete the task and send result to the doctor." },
        { state: "Complete", info: "Appointment is completed." },
    ]

    let debounce;

    useEffect(() => {

        const fetchData = async () => {

            Swal.fire({
                icon: "info",
                title: "Waiting to get data..."
            });
            Swal.showLoading();
            let res = await getAppointment(id);

            if (res.status === 200) {
                setAppointmentInfo(res.data);
            }
            else if (res.status < 500) {
                toast.error("Something wrong!");
            }

            Swal.close();
        }

        if (id != null) {
            fetchData();
        }

    }, [id]);



    const handlFeedback = (name, value) => {
        clearTimeout(debounce);

        if (name === 'ratingPoint') {
            setFeedback((preveState) => ({
                ...preveState,
                [name]: value
            }))
        }
        else {
            debounce = setTimeout(() => {
                setFeedback((preveState) => ({
                    ...preveState,
                    [name]: value
                }))
            }, 1000);
        }
    }


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

    const handleSubmitFeedback = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This item will be submit.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Code to update the item goes here
                Swal.fire({
                    title: "Loading...",
                    html: "Please wait a moment",
                });
                Swal.showLoading();


                const res = await feedbackAppointment(appointmentInfo.id, feedback);


                Swal.close();

                if (res.status === 200) {
                    console.log(res.data);

                    toast.success('Update successful')
                } else if (res.status < 500) {
                    Swal.fire({
                        icon: "error",
                        html: res.data[0].description,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Something wrong!",
                    });
                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                toast.error('Action Cancelled')
            }
        });
    }

    return (<>
        <div className="user-appointment-detail my-5 p-5">
            <div className="container">
                <div className=" shadow border">
                    <div className="row text-center my-5">
                        <h1>Appointment Information</h1>
                    </div>
                    {appointmentInfo
                        ?
                        <>
                            {appointmentInfo.state === "Complete" &&
                                <div className='row justify-content-around mb-4'>
                                    <h2 className='col-12 alert alert-warning'>Appointment Rating</h2>
                                    <div className='col-auto '>
                                        <label htmlFor="content">Rating Point: </label>
                                        <Rating className="justify-content-center" value={feedback.ratingPoint} onChange={(e) => { handlFeedback('ratingPoint', e.value) }} />
                                        <label htmlFor="content">Content: </label>
                                        <textarea className="form-control" type="text" placeholder="You can write your feedback about service, doctor or anything in this field." name="content" rows={5} cols={50} onChange={(e) => { handlFeedback(e.target.name, e.target.value) }} />

                                        <button className="btn btn-primary my-2" onClick={() => handleSubmitFeedback()}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            }
                            {/* Key info */}
                            <div className='row justify-content-around mb-4'>
                                <h2 className='col-12 alert alert-primary'>Key Information</h2>
                                <div className='col-auto '>
                                    <div className="">
                                        <label htmlFor="date">Date: </label>
                                        <input id="date" className="form-control mb-2 bg-white" type="text" name="date" placeholder={appointmentInfo.date.split('T')[0]} disabled />
                                        <label htmlFor="form">Form: </label>
                                        <input id="form" className="form-control mb-2 bg-white" type="text" name="form" placeholder={appointmentInfo.from.split('T')[1]} disabled />
                                        <label htmlFor="to">To: </label>
                                        <input id="to" className="form-control mb-2 bg-white" type="text" name="to" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                                    </div>
                                </div>
                                <div className='col-auto'>
                                    <div className="">
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
                            <div className='row justify-content-around  mb-4'>
                                <div className='col-auto '>
                                    <div className="m-lg-0 m-4">
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
                                    <div className="m-lg-0 m-4">

                                        <label htmlFor="doctor-name">Content: </label>
                                        <textarea id="doctor-name" className="form-control mb-2 bg-white" rows={5} name="doctor-name" placeholder={appointmentInfo.content} disabled />

                                    </div>
                                </div>
                            </div>
                            {/* Patient */}
                            <div className="row  justify-content-around  mb-4">
                                <h1 className="col-12 alert alert-secondary" role="alert">Patient</h1>

                                <img src={appointmentInfo.patient.baseUser.imageURL} className='col-auto w-25 py-5 rounded-circle' alt="..." />

                                <div className="col-lg-auto  col-sm-12">
                                    <div className="m-lg-0 m-4">
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
                            <div className='row justify-content-around  mb-4'>
                                <h2 className='col-12 alert alert-secondary'>Doctor Profile</h2>
                                <div className='col-lg-auto  col-sm-12 '>
                                    <div className="m-lg-0 m-4">
                                        <label htmlFor="doctor-email">UserName:</label>
                                        <input id="doctor-email" className="form-control mb-2 bg-white" type="text" name="doctor-email" placeholder={appointmentInfo.doctor.baseUser.userName} disabled />
                                        <label htmlFor="doctor-fullName">Full Name:</label>
                                        <input id="doctor-fullName" className="form-control mb-2 bg-white" type="text" name="doctor-fullName" placeholder={appointmentInfo.doctor.baseUser.fullName} disabled />
                                        <label htmlFor="doctor-email">Phone:</label>
                                        <input id="doctor-email" className="form-control mb-2 bg-white" type="text" name="doctor-email" placeholder={appointmentInfo.doctor.baseUser.phoneNumber} disabled />
                                    </div>
                                </div>
                                <img src={appointmentInfo.doctor.baseUser.imageURL} className='col-auto w-25 py-5 rounded-circle' alt="..." />

                            </div>
                            {/* Service */}
                            <div className='row justify-content-around  mb-4'>
                                <h2 className='col-12 alert alert-secondary'>Service Information</h2>
                                <img src={appointmentInfo.service.imageURL} className='col-auto w-25 py-5 rounded-circle' alt="..." />
                                <div className='col-lg-auto  col-sm-12 '>
                                    <div className="m-lg-0 m-4">
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

    </>);
}

export default AppointmentDetail;