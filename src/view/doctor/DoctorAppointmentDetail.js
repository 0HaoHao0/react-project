import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAppointment } from "../../services/doctor/DoctorApi";

function DoctorAppointmentDetail() {
    const { id } = useParams();
    const [appointmentInfo, setAppointmentInfo] = useState();



    useEffect(() => {
        const loadData = async () => {
            const res = await getAppointment(id);
            if (res.status === 200) {
                setAppointmentInfo(res.data)
            }
            else {
                toast.error('Something was wrong, please contact to admin !')
            }
        }
        loadData()

        return () => {

        }
    }, [id])

    return (<>
        <div className="doctor-appointment-detail">
            <h1>Appointment Detail</h1>
            <hr />
            {appointmentInfo ? <>
                <div className="alert alert-primary" role="alert">
                    Information
                </div>
                <div className="row g-2">
                    <div className="col ">
                        <div className="form-group">
                            <label htmlFor="id">Id:</label>
                            <input id="id" className="form-control" type="text" name="id" placeholder={appointmentInfo.id} disabled />
                            <label htmlFor="timeCreated">Time Created:</label>
                            <input id="timeCreated" className="form-control" type="text" name="timeCreated" placeholder={appointmentInfo.timeCreated.split('T')[0]} disabled />
                            <label htmlFor="lastModified">Last Modified:</label>
                            <input id="lastModified" className="form-control" type="text" name="lastModified"
                                placeholder={appointmentInfo.lastModified && appointmentInfo.lastModified.split('T')[0]} disabled />
                            <label htmlFor="state">State:</label>
                            <input id="state" className="form-control" type="text" name="state" placeholder={appointmentInfo.state} disabled />
                        </div>
                    </div>
                    <div className="col ">
                        <label htmlFor="date">Date:</label>
                        <input id="date" className="form-control" type="text" name="date" placeholder={appointmentInfo.date.split("T")[0]} disabled />
                        <label htmlFor="start">Start:</label>
                        <input id="start" className="form-control" type="text" name="start" placeholder={appointmentInfo.from.split("T")[1]} disabled />
                        <label htmlFor="end">End:</label>
                        <input id="end" className="form-control" type="text" name="end" placeholder={appointmentInfo.to.split('T')[1]} disabled />
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" className="form-control" type="text" rows={10} name="content" placeholder={appointmentInfo.content} />
                        </div>
                    </div>

                </div>
                <div className="alert alert-secondary" role="alert">
                    Patient
                </div>
            </>
                :
                <>
                    <div className="d-flex align-items-center justify-content-center">
                        <h1>Loading ...</h1>
                        <div className="spinner-border mx-5" role="status" aria-hidden="true"></div>
                    </div>
                </>}
        </div>
    </>);
}

export default DoctorAppointmentDetail;