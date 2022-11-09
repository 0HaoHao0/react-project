import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppointmentCreate, getSlots } from "../../../services/UserApiConnection/userAppointment";
import defaultFile from '../../../assets/file/AppointmentForm.docx';
import { toast } from "react-toastify";

function SetAppointment() {
    const navigate = useNavigate();

    let location = useLocation();

    const [slots, setSlots] = useState([]);

    let appointmentData = {
        patientId: location.state.userId,
        serviceId: location.state.serviceId,
        date: null,
        slot: null,
        content: null,
        document: [],
    }

    const getData = async () => {
        await getSlots((response) => { setSlots(response.data) })
    }

    useEffect(() => {
        getData();
    }, [])

    //Submit
    const handleSubmit = async () => {
        let data = new FormData();
        data.append('patientId', appointmentData.patientId);
        data.append('serviceId', appointmentData.serviceId);
        data.append('date', appointmentData.date);
        data.append('slot', appointmentData.slot);
        data.append('content', appointmentData.content);
        data.append('document', appointmentData.document);

        let res;
        await AppointmentCreate(data, (response) => { res = response });
        console.log(res);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/appointment')
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }
    return (
        <>
            <div>
                <div className="card m-5" >
                    <div className="card-body">
                        <h1 className="card-title text-center">Appointment</h1>
                        <br />
                        <div className="row">
                            <div className="col-3">

                                <label ><h3>Service Name: </h3></label>
                            </div>
                            <div className="col-9">
                                <h3>
                                    {location.state.serviceName}
                                </h3>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-3">

                                <label ><h3>Date: </h3></label>
                            </div>
                            <div className="col-2">

                                <input type="date" className="form-control" placeholder="Example label"
                                    onChange={(e) => { appointmentData.date = e.target.value }} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-3">

                                <label ><h3>Time: </h3></label>
                            </div>
                            <div className="col-2">
                                <select className="form-select" aria-label="Default select example"
                                    onChange={(e) => { appointmentData.slot = e.target.value }}>
                                    <option defaultValue={null}>Select Appointment Time</option>
                                    {
                                        slots.map((item, index) =>
                                            <option key={index} value={item.id}>{item.name}, {item.desc}</option>
                                        )
                                    }
                                </select>

                            </div>
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-3">

                                <label ><h3>Content: </h3></label>
                            </div>
                            <div className="col-9">
                                <textarea type="text" rows={5} className="form-control" placeholder="Example label"
                                    onChange={(e) => { appointmentData.content = e.target.value }} />

                            </div>
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-3 ">

                                <label ><h3>Appointment Record: </h3></label>

                            </div>
                            <div className="col-4">
                                <input className="form-control" type="file" accept=".docx" id="formFile"
                                    onChange={(e) => { appointmentData.document = e.target.files[0] }} />
                            </div>
                            <div className="col-1">
                                <a href={defaultFile} className="btn btn-success" download={true}><i className="fa fa-download"></i></a>
                            </div>
                        </div>
                        <br />
                        <button className="btn btn-primary" onClick={() => { handleSubmit() }}>Submit</button>

                    </div>
                </div>

            </div>
        </>
    );
}

export default SetAppointment;