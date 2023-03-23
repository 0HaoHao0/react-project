import { useEffect, useState } from 'react';
import { getAppointmentQueueAPI } from '../../services/technician/apiTechnician';
import { TechnicianSideBar } from './TechnicianSideBar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import "./Technician.scss";


function Technician() {

    const [appointmentQueue, setAppointmentQueue] = useState([]);
    const [paramsFilter, setParamsFilter] = useState({
        startDate: null,
        endDate: new Date().toISOString().slice(0, 10),
        state: null,
        phoneNumber: null,
        userName: null,
    });

    const [paginated, setPaginated] = useState({
        page: 1,
        pageSize: 5,
    });

    useEffect(() => {

        Swal.fire({
            icon: "info",
            title: "Waiting to get data...",
        });

        Swal.showLoading();
        getAppointmentQueueAPI(paramsFilter, (res) => {
            if (res && res.status === 200) {
                console.log(res.data);
                let queue = res.data.data;
                setAppointmentQueue(queue);

                setPaginated({
                    page : res.data.page,
                    pageSize : res.data.total_pages,
                });

            }
            else {
                toast.error("Something wrong!");
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
                                <div key={label} className="card">
                                    <div className={`card-body ${(new Date(label).toLocaleDateString() === (new Date()).toLocaleDateString() ? "bg-light shadow" : "")}`}>
                                        <div className={`row`}>
                                            <div className="col-lg-3 px-2 mb-2">
                                                <div className="bg-dark text-white">
                                                    <h3 className="text-center">{new Date(label).toLocaleDateString()}</h3>
                                                    <hr className="w-100"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="row justify-content-center">
                                                    {data.map((item, idx) => (
                                                        <div key={idx} className="col-md-6">
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
                                                                        <div className="row">
                                                                            <span className="col-4 text-end">Service:</span>
                                                                            <span className="col-8 text-start">{item.service.serviceName}</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <span className="col-4 text-end">Time:</span>
                                                                            <span className="col-8 text-start">{item.time}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className="technican-sidebar-wrapper col-3 p-4 bg-light rounded shadow">
                    <TechnicianSideBar initialValue={paramsFilter} handleSubmitFilter={(formData) => {
                        setParamsFilter({
                            ...paramsFilter,
                            ...formData,
                            phoneNumber: formData.searchText,
                            userName: formData.searchText,
                        });
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default Technician;