import './Booking.scss'
import file from '../../assets/file/HospitalDocument.docx'
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createAppointment, getFreeDoctors, getSlots } from "../../services/user/ApiAppointment";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Booking() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [appointment, setAppointment] = useState({
        Date: '',
        Slot: '',

    });
    const [appointmentOther, setAppointmentOther] = useState({
        Content: '',
    });

    //
    const [slots, setSlots] = useState();
    const [doctors, setDoctors] = useState();

    const [dislayDoctor, setDisplayDoctor] = useState(false);



    const loadData = async () => {
        const res = await getSlots();
        setSlots(res.data);
    }

    useEffect(() => {
        loadData();

        return () => {
        }
    }, [])



    useEffect(() => {

        const loadFreeDoctor = async () => {
            const res = await getFreeDoctors(appointment);
            if (res.status === 200) {
                toast.success('Successful load doctor')
                setDoctors(res.data)
            }
            else {
                toast.error("Something was wrong !!!")
            }
        }

        if (appointment && appointment.Date && appointment.Slot !== '') {
            loadFreeDoctor();
        }
        else {
            setDoctors(undefined);
        }
        return () => {

        }
    }, [appointment])







    const handleChange = (e) => {

        const { name, value } = e.target;
        setAppointment((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }



    const handleAppointmentOther = (e) => {
        if (e.target.type === 'file') {
            const { name } = e.target;
            const file = e.target.files[0];
            setAppointmentOther((prevState) => ({
                ...prevState,
                [name]: file
            }));
        }
        else {
            const { name, value } = e.target;
            setAppointmentOther((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }


    const handleCard = (id) => {
        const name = 'Slot'
        setAppointment((prevState) => ({
            ...prevState,
            [name]: id
        }));
    }


    const handleDisplayDoctor = (e) => {
        dislayDoctor ? setDisplayDoctor(false) : setDisplayDoctor(true)
    }


    const handleSubmit = async () => {
        if (!appointment.Date || appointment.Slot === '' || !appointmentOther.Content) {
            toast.error('Please finish all require input !')
        }

        else {
            let formData = new FormData();
            formData.append("PatientId", user.userInfo.id);
            if (appointmentOther.Doctor) formData.append("DoctorId", appointmentOther.Doctor);
            formData.append("ServiceId", state.id);
            formData.append('Slot', appointment.Slot)
            formData.append('Date', appointment.Date)
            formData.append('Document', appointmentOther.Document);
            formData.append('Content', appointmentOther.Content);

            Swal.fire({
                title: "Loading...",
                html: "Please wait a moment"
            })
            Swal.showLoading()
            const res = await createAppointment(formData);
            Swal.close()
            if (res.status === 200) {
                navigate('/user/appointment')
            }
            else {
                toast.error('Something was wrong, Please contact to Admin !!!')
            }
        }


    }
    return (<>
        <div className="booking m-5">

            <div className="row g-5 pt-5 px-5">
                <div className="col-lg-6 col-sm-12 ">
                    <div className="border shadow h-100 p-5 row align-content-center">
                        <div className="row  justify-content-center mb-5">
                            <img src={state.imageURL} className='w-50' alt="..." />
                        </div>
                        <div className="row mb-3 ">
                            <div className="col-6">
                                <label htmlFor="">Service Name:</label>
                                <span> {state.serviceName} </span>
                            </div>
                            <div className="col-6" >
                                <label htmlFor="">Service Code:</label>
                                <span> {state.serviceCode} </span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12" >
                                <label htmlFor="">Price:</label>
                                <span> {state.price} </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <div className="border shadow p-5 h-100 row">
                        <h6 className="text-center">Appointment Information Picker </h6>

                        <div className="form-group">
                            <label htmlFor="date">Select a date: </label>
                            <input id="date-picker" name="Date" className="form-control" type="date" onChange={handleChange}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                min={moment().add(1, 'days').format("YYYY-MM-DD")}
                                max={moment().day(12).format("YYYY-MM-DD")} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date-picker">Select a slot: </label>
                            <div className="row justify-content-center ">
                                {slots && slots.map((value, index) =>
                                    <div className="col " onClick={() => handleCard(value.id)} key={value.id}>
                                        <div className={`card overflow-auto m-1 ${appointment && (appointment.Slot === value.id ? 'bg-primary text-white' : null)} `}>
                                            <div className="card-body">
                                                <h5 className="card-title">Slot: {value.id + 1}</h5>
                                                <p className="card-text">Time: {value.short_description}</p>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>

                        </div>
                        <div className="form-group ">
                            <label htmlFor="chooseDoctor">Choose Doctor: </label>
                            <input className={`form-check-input mx-2 ${doctors && 'bg-dark'} `} type="checkbox" id="chooseDoctor" onClick={handleDisplayDoctor} disabled={doctors ? false : true} /><span className="text-muted">*Not required*</span>
                            {dislayDoctor &&
                                <div>
                                    {
                                        doctors &&
                                        <>
                                            <select id="Doctor" className="form-control" name="Doctor" onChange={handleAppointmentOther}>
                                                <option value=''>Open this select menu</option>
                                                {doctors.map((value, index) =>
                                                    <option value={value.id} key={value.id}>Name: {value.baseUser.fullName}</option>
                                                )}
                                            </select>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="document">Document:</label>
                            <a href={file} className='mx-2' download>Sample File</a>
                            <span className="text-muted">*Not required*</span>
                            <input id="document" className="form-control" type="file" name="Document" accept='.docx' onChange={handleAppointmentOther} />

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" className="form-control" name="Content" rows="10" onChange={handleAppointmentOther}></textarea>
                        </div>

                    </div>
                </div>
            </div>
            <div className="text-center my-5">
                <button className="btn btn-primary w-50" type="button" onClick={handleSubmit}>Book Now</button>
            </div>
        </div>
    </>);
}

export default Booking;