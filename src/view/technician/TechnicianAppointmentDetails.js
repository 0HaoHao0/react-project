import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAppointmentDetailAPIs, getImageSegmentationResults } from "../../services/technician/apiTechnician";
import ImageSegmentationResults from "./ImageSegmentationResults";



function TechnicianAppointmentDetails() {

    const { id } = useParams();

    const [appointment, setAppointment] = useState(null);

    useEffect(() => {

        getAppointmentDetailAPIs({
            id: id,
            callback: (res) => {
                if(res.status === 200) {
                    setAppointment(res.data);
                }
                else {
                    console.log(res);
                }
            }
        });

    }, [id]);

    const states = [
        {
            label: "Transfer",
            text: "Transfer",
            color: "primary",
            value: 4
        },
        {
            label: "Doing",
            text: "TransferDoing",
            color: "warning",
            value: 6
        },
        {
            label: "Cancel",
            text: "TransferCancel",
            color: "danger",
            value: 5
        },
        {
            label: "Complete",
            text: "TransferComplete",
            color: "success",
            value: 7
        }
    ];

    const [selectedState, setSelectedState] = useState(null); 


    return (  
        <>
            <div className="technician">
                <h2 className="text-center text-primary py-2 mt-4">Technician Pannel</h2>
                <hr />
                {appointment && (
                    <div className="container">
                        <div className="card my-3">
                            <div className="card-header">
                                <h4>Appointment Details</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Doctor:</strong> {appointment.doctor.baseUser.fullName}</p>
                                        <p><strong>Patient:</strong> {appointment.patient.baseUser.fullName}</p>
                                        <p><strong>Service:</strong> {appointment.service.serviceName}</p>
                                        <p><strong>Room:</strong> {appointment.room.roomCode}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Date:</strong> {appointment.date}</p>
                                        <p><strong>Time:</strong> {appointment.time}</p>
                                        <p><strong>State:</strong> <span className="badge bg-primary">{appointment.state}</span> </p>
                                        <p><strong>Content:</strong> {appointment.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="imageUpload" className="form-label fw-bold">Upload Image:</label>
                                        <input type="file" className="form-control" id="imageUpload" />
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-success w-100">Submit</button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="imageUpload" className="form-label fw-bold">Update State:</label>
                                        {
                                            states.map((item, idx) => (item.text !== appointment.state) ?
                                                <button 
                                                    key={idx}
                                                    value={item.value} 
                                                    className={`btn btn${(selectedState !== item.value ? "-outline" : "")}-${item.color} mx-2`}
                                                    onClick={(e) => {
                                                        setSelectedState(e.target.value);
                                                    }}
                                                >
                                                    {item.label}
                                                </button> : null)
                                        }
                                    </div>
                                    <div className="mb-3 text-center">
                                        
                                       
                                    </div>
                                </div>
                            </div>


                        </div>

                        <ImageSegmentationResults appointmentId={id}/>

                        
                    </div>
                )}
                
                


            </div>
        </>
    );
}

export default TechnicianAppointmentDetails;