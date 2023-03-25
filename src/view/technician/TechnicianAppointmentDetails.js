import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAppointmentDetailAPIs, updateStateForAppointmentAPI, uploadXRayImageAPI } from "../../services/technician/apiTechnician";
import ImageSegmentationResults from "./ImageSegmentationResults";


function TechnicianAppointmentDetails() {

    const { id } = useParams();

    const [appointment, setAppointment] = useState(null);

    useEffect(() => {

        Swal.fire({
            icon: "info",
            title: "Waiting for response..."
        });
        Swal.showLoading();

        getAppointmentDetailAPIs({
            id: id,
            callback: (res) => {
                if(res.status === 200) {
                    setAppointment(res.data);
                }
                else if(res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("The system is busy!");
                }

                Swal.close();
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

    const [isChangingState, setIsChangingState] = useState(false);
    const handleChangeState = (stateIndex, stateObject) => {
        setIsChangingState(true);

        updateStateForAppointmentAPI({
            appointmentId: id,
            stateIndex: stateIndex,
            callback: (res) => {
                if(res.status === 200) {
                    setAppointment({
                        ...appointment,
                        state: stateObject.text,
                    });
                }
                else if(res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("The system is busy!");
                }

                setIsChangingState(false);
                setSelectedState(null);
            }
        })

    }

    const [imageUpload, setImageUpload] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const handleUploadImage = (e) => {
        e.preventDefault();

        setIsUploadingImage(true);
        let formData = new FormData();
        formData.append("AppointmentId", id);
        formData.append("Image", imageUpload);
        uploadXRayImageAPI({
            formData: formData,
            callback: (res) => {
                if(res.status === 200) {
                    setRefreshResult(true);
                }
                else if(res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("The system is busy!");
                }

                setIsUploadingImage(false);
            }
        });

    }

    const [refreshResults, setRefreshResult] = useState(false);

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
                                        <p><strong>State:</strong>{appointment.state}</p>
                                        <p><strong>Content:</strong> {appointment.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="row">
                                <form onSubmit={handleUploadImage} className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="imageUpload" className="form-label fw-bold">Upload Image:</label>
                                        <input required type="file" accept="image/*" className="form-control" onChange={(e) => {
                                            setImageUpload(e.target.files[0]);
                                        }}/>
                                    </div>
                                    <div className="mb-3">
                                        <button disabled={isUploadingImage} type="submit" className="btn btn-success w-100">Submit</button>
                                    </div>
                                    {
                                        isUploadingImage && (
                                            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                                                <span className="spinner-border" role="status">
                                                </span>
                                                <span className="text-danger">Waiting for upload image...</span>
                                            </div>
                                        )
                                    }
                                </form>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="imageUpload" className="form-label fw-bold">Update State:</label>
                                        {
                                            states.map((item, idx) => (item.text !== appointment.state) ?
                                                <button 
                                                    key={idx}
                                                    className={`btn btn${(selectedState?.value !== item.value ? "-outline" : "")}-${item.color} mx-2`}
                                                    onClick={(e) => {
                                                        setSelectedState({
                                                            ...item
                                                        });
                                                        handleChangeState(item.value, item);
                                                    }}
                                                    disabled={isChangingState}
                                                >
                                                    {item.label}
                                                </button> : null)
                                        }
                                    </div>
                                    <div className="mb-3">
                                        {
                                            isChangingState ?
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <span className="spinner-border" role="status">
                                                </span>
                                                <span className="text-danger">Waiting for update state "{selectedState.text}"...</span>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        <ImageSegmentationResults appointmentId={id} showLoading={!refreshResults} completeFn={() => {
                            setRefreshResult(false);
                        }}/>

                        
                    </div>
                )}
                


            </div>
        </>
    );
}

export default TechnicianAppointmentDetails;