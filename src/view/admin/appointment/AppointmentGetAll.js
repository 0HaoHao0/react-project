import { useRef, useState } from "react";
import { toast } from "react-toastify";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllAppointment } from "../../../services/admin/appointment/apiAppointment";
import Swal from "sweetalert2";
import { getAppointmentStates } from "../../../services/receptionist/apiReceptionistAppointment";

function AppointmentGetAll() {
    const rendered = useRef(false);

    const [appointmentData, setAppointmentData] = useState();
    const currentPage = appointmentData ? appointmentData.page : 1;
    const totalPage = appointmentData ? appointmentData.total_pages : 0;

    const [appointmentStateList, setAppointmentStateList] = useState([]);

    const defaultFilter = {
        page: currentPage,
        pageSize: 5,
        userName: null,
        phoneNumber: null,
        state: null,
    }

    const [filter, setFilter] = useState(defaultFilter);

    useEffect(() => {

        const doEffect = async () => {
            let res = await getAppointmentStates();
            if (res.status === 200) {
                setAppointmentStateList(res.data);
            }
        }

        doEffect();

    }, []);

    useEffect(() => {

        const loadData = async () => {
            if (rendered.current) {
                Swal.fire({
                    icon: "info",
                    title: "Waiting for response..."
                });
                Swal.showLoading();
            }
            let res = await getAllAppointment({
                params: filter
            });

            if (res.status === 200) {
                console.log(res.data);
                setAppointmentData(res.data);
            } else {
                toast.error("Something went wrong !!!");
            }
            if (rendered.current) {
                Swal.close();
            }
        }

        loadData();

        return () => {
            rendered.current = true
        }

    }, [filter]);



    // Pagination
    const peviousPage = (e) => {
        if (filter.page - 1 > 0) {
            setFilter({
                ...filter,
                page: filter.page - 1
            })
        }
    }
    const nextPage = (e) => {
        if (filter.page + 1 <= totalPage) {
            setFilter({
                ...filter,
                page: filter.page + 1
            })
        }
    }

    const enterPage = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value >= -9999999 && e.target.value <= 9999999) {
                if (e.target.value < 1) {
                    toast.error("Page must larger than 1!")
                }
                else if (e.target.value > totalPage) {
                    toast.error("Max Page is " + totalPage)
                }
                else {
                    setFilter({
                        ...filter,
                        page: e.target.value
                    });
                    e.target.value = "";
                    e.target.blur();
                }
            }
            else {
                toast.error("Input in wrong format!");
            }
        }
    }
    return (<>
        <div className="doctor-getall p-5">
            {!appointmentData ? (
                <>
                    <h1>Appointment Management</h1>
                    <hr />
                    <DataLoading></DataLoading>
                </>
            ) : (
                <>
                    <h1>Appointment Management</h1>
                    <hr />
                    <form className="d-flex justify-content-end gap-2">
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by UserName" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            userName: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by PhoneNumber" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            phoneNumber: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <select className="p-2 rounded" onChange={(e) => {
                                if (e.target.value === "default") {
                                    setFilter({
                                        ...filter,
                                        state: null
                                    });
                                }
                                else {
                                    setFilter({
                                        ...filter,
                                        state: e.target.value,
                                        page: 1,
                                    });
                                }
                            }}>
                                <option value="default">Choose State</option>
                                {
                                    appointmentStateList.map(item =>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </form>
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover ">
                            <thead>
                                <tr className="table-dark">
                                    <th>UserName</th>
                                    <th>Doctor Name</th>
                                    <th>Service Name</th>
                                    <th>Required Time</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.patient.baseUser.userName}</td>
                                        <td>{value.doctor.baseUser.userName}</td>
                                        <td>{value.service.serviceName}</td>
                                        <td>{value.date.split("T")[0]} {value.time}</td>
                                        <td>{value.patient.baseUser.phoneNumber}</td>
                                        <td>{value.state}</td>
                                        <td>
                                            <Link
                                                to={`${value.id}/detail`}
                                                className="btn btn-success"
                                            >
                                                <i className="fa-solid fa-circle-info"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagiation
                        page={appointmentData.page}
                        total_pages={appointmentData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>
            )}
        </div>
    </>);
}

export default AppointmentGetAll;