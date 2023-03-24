import { useEffect, useState } from 'react';
import { getAppointmentQueueAPI } from '../../services/technician/apiTechnician';
import { TechnicianSideBar } from './TechnicianSideBar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import "./Technician.scss";
import { useSelector } from 'react-redux';

import Pusher from 'pusher-js';

function PagingBar({ pageIndex, pageCount, onPageChange }) {
    // calculate page numbers to display in the bar
    const pages = [];
    const pageButtonsToShow = 5; // number of page buttons to display
    let startPage = 1;
    if (pageCount > pageButtonsToShow) {
        startPage = Math.max(pageIndex - Math.floor(pageButtonsToShow / 2), 1);
        const endPage = Math.min(startPage + pageButtonsToShow - 1, pageCount);
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    } else {
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
    }

    return (
        <div className="d-flex justify-content-end mb-2 gap-2">
                <button
                    className="btn btn-outline-secondary"
                    disabled={pageIndex === 1}
                    onClick={() => onPageChange(pageIndex - 1)}
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        className={pageIndex === page ? 'btn btn-primary' : 'btn btn-outline-primary'}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="btn btn-outline-secondary"
                    disabled={pageIndex === pageCount}
                    onClick={() => onPageChange(pageIndex + 1)}
                >
                    Next
                </button>
        </div>
    );
}

function Technician() {

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user).userInfo;
    if(!userInfo) navigate("/login");
    const [channel, setChannel] = useState(null);

    useEffect(() => {

        const pusherClient = new Pusher('a5612d1b04f944b457a3', {
            cluster: 'ap1',
            encrypted: true,
        });
        
        let pusherChannel = pusherClient.subscribe(userInfo.pusherChannel);
        setChannel(pusherChannel);

    }, [userInfo]);

    const [appointmentQueue, setAppointmentQueue] = useState([]);
    const [paramsFilter, setParamsFilter] = useState({
        startDate: null,
        endDate: new Date().toISOString().slice(0, 10),
        state: null,
        phoneNumber: null,
        userName: null,
    });

    const [paginated, setPaginated] = useState({
        page: 0,
        pageSize: 0,
        pageTotals: 0,
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
                    page: res.data.page,
                    pageSize: res.data.per_page,
                    pageTotals: res.data.total_pages,
                });
            }
            else {
                toast.error("Something wrong!");
            }

            Swal.close();
        });

    }, [paramsFilter]);

    const fetchNewPage = (page) => {

        Swal.fire({
            icon: "info",
            title: "Waiting to get data...",
        });

        Swal.showLoading();
        getAppointmentQueueAPI({
            ...paramsFilter,
            page: page
        }, (res) => {
            if (res && res.status === 200) {
                console.log(res.data);
                let queue = res.data.data;
                setAppointmentQueue(queue);
            }
            else {
                toast.error("Something wrong!");
            }

            Swal.close();
        });
    }

    useEffect(() => {
        
        if(channel) {

            channel.bind_global((action, data) => {
                if(action === "AppointmentUpdate") {
                    let message = data;
                    console.log(data);
                    toast.warning(message);
    
                }
            });
        }

    }, [channel]);


    const cardColors = {
        Transfer: "primary",
        TransferDoing: "warning",
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

    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="technician">
            <h2 className="text-center text-primary py-2 mt-4">Technician Pannel</h2>
            <hr />
            <div className="row">
                <div className="col-lg-9">
                    <div className="container-fluid">
                        {
                            paginated.pageTotals > 1 &&
                            <PagingBar 
                                pageIndex={paginated.page} 
                                pageCount={paginated.pageTotals}
                                onPageChange={(page) => {
                                    setPaginated({
                                        ...paginated,
                                        page: page
                                    });
                                    
                                    fetchNewPage(page);
                                }}
                            />
                        }
                        {
                            appointmentQueueGroupByDate &&
                            appointmentQueueGroupByDate.map(({ label, data }) => (
                                <div key={label} className="card mb-2">
                                    <div className={`card-body ${(new Date(label).toLocaleDateString() === (new Date()).toLocaleDateString() ? "bg-light shadow" : "")}`}>
                                        <div className={`row`}>
                                            <div className="col-lg-3 px-2 mb-2">
                                                <div className="bg-dark text-white">
                                                    <h3 className="text-center">{new Date(label).toLocaleDateString()}</h3>
                                                    <hr className="w-100" />
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="row justify-content-center" style={{ rowGap: "10px" }}>
                                                    {data.map((item, idx) => (
                                                        <div key={idx} className="col-md-6">
                                                            <Link to={"."} style={{ color: 'inherit' }} className="text-decoration-none">
                                                                <div className={`rounded border shadow card`}>
                                                                    <div className={`card-header text-white text-center bg-${cardColors[item.state]}`}>
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
                <div className="technican-sidebar-wrapper col-lg-3 p-4 bg-light rounded shadow">
                    <TechnicianSideBar initialValue={paramsFilter} handleSubmitFilter={(formData) => {
                        setParamsFilter({
                            ...paramsFilter,
                            ...formData,
                            phoneNumber: formData.searchText,
                            userName: formData.searchText,
                        });
                    }} />
                </div>
            </div>

            {showScroll && (
                <button className="btn btn-danger scroll-to-top" onClick={scrollToTop}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}

        </div>
    );
}

export default Technician;