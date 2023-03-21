import { useEffect, useState } from 'react';
import { getAppointmentQueueAPI } from '../../services/technician/apiTechnician';
import { TechnicianSideBar } from './TechnicianSideBar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


function Technician() {

    const [appointmentQueue, setAppointmentQueue] = useState([]);
    const [paramsFilter, setParamsFilter] = useState({
        from: null,
        to: new Date().toISOString(),
        state: null,
    });

    const [paginated, setPaginated] = useState({
        page: 1,
        pageSize: 10,
    });

    useEffect(() => {

        Swal.fire({
            icon: "info",
            title: "Waiting to get data...",
        });
        Swal.showLoading();
        getAppointmentQueueAPI(paramsFilter, (res) => {

            if (res.status === 200) {
                console.log(res.data);
                let queue = res.data.data;
                setAppointmentQueue(queue);
            }
            else {
                console.log(res);
            }
            Swal.close();
        });

    }, [paramsFilter]);

    const cardColors = {
        Transfer: "primary",
        TransferDoing: "secondary",
        TransferCancal: "danger",
        TransferComplete: "success"
    }

    const groupBy = (arr, property) => {
        return Object.entries(
            arr.reduce((acc, obj) => {
                const key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {})
        ).map(([label, data]) => ({ label, data }));
    }

    const appointmentQueueGroupByDate = groupBy(appointmentQueue, "date");

    return (
        <div className="technician">
            <h2 className="text-center text-primary py-2 mt-4">Technician Pannel</h2>
            <hr />
            <div className="row">
                <div className="col-9">
                    <div className="container-fluid">
                        {
                            appointmentQueueGroupByDate &&
                            appointmentQueueGroupByDate.map(({ label, data }) => (
                                <div className="mb-2">
                                    <div className="row">
                                        <h3 className="col-md-3 px-2 mb-2 text-center">{new Date(label).toLocaleDateString()}</h3>
                                        <div className="col-md-9">
                                            <div className="row">
                                                {data.map((item, idx) => (
                                                    <div key={idx} className="col-lg-4 col-md-6">
                                                        <Link to={"."} style={{ color: 'inherit' }}>
                                                            <div className={`rounded border shadow card card-${cardColors[item.state]}`}>
                                                                <div className="card-header text-center">
                                                                    <h4>{item.patient.baseUser.fullName}</h4>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <span className="col-4 text-end">Patient:</span>
                                                                        <span className="col-8 text-start">{item.patient.baseUser.userName}</span>
                                                                    </div>
                                                                    <div className="row">
                                                                        <span className="col-4 text-end">State:</span>
                                                                        <span className="col-8 text-start">
                                                                            <span className={"badge bg-" + cardColors[item.state]}>{item.state}</span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="row">
                                                                        <span className="col-4 text-end">Phone:</span>
                                                                        <span className="col-8 text-start">{item.patient.baseUser.phoneNumber}</span>
                                                                    </div>
                                                                    <div className="row">
                                                                        <span className="col-4 text-end">Doctor:</span>
                                                                        <span className="col-8 text-start">{item.doctor.baseUser.fullName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }

                    </div>

                </div>
                <div className="col-3 p-4 bg-light rounded shadow">
                    <TechnicianSideBar />
                </div>
            </div>
        </div>
    );
}

export default Technician;