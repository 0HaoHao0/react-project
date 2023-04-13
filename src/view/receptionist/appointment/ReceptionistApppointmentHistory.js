import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { getAllAppointment, getAppointmentStates } from "../../../services/receptionist/apiReceptionistAppointment";
import Swal from "sweetalert2";

function ReceptionistAppointmentHistory() {
    const [appointmentData, setAppointmentData] = useState();
    // const user = useSelector((state) => state.user);

    const currentPage = appointmentData ? appointmentData.page : 1;
    const totalPage = appointmentData ? appointmentData.total_pages : 0;


    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,
        userName: null,
        phoneNumber: null,
        state: null,
    });

    const [appointmentStateList, setAppointmentStateList] = useState([]);

    useEffect(() => {

        const doEffect = async () => {
            let res = await getAppointmentStates();
            if (res.status === 200) {
                setAppointmentStateList(res.data);
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something went wrong, please try again !!!")
            }
        }

        doEffect();

    }, []);

    useEffect(() => {
        const loadData = async () => {

            Swal.fire({
                icon: "info",
                title: "",
                text: "Waiting for get data..."
            });
            Swal.showLoading();
            const res = await getAllAppointment(filter);
            if (res.status === 200) {
                setAppointmentData(res.data);
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something went wrong, please try again !!!")
            }
            Swal.close();
        };

        loadData();

        return () => {
        }
    }, [filter]);


    // Pagination
    const peviousPage = () => {
        setFilter((peviousPage) => ({
            ...peviousPage,
            page: peviousPage.page - 1
        }));
    }
    const nextPage = (e) => {
        if (filter.page + 1 <= totalPage) {
            setFilter((peviousPage) => ({
                ...peviousPage,
                page: peviousPage.page + 1
            }));
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
                    const page = e.target.value
                    setFilter((peviousPage) => ({
                        ...peviousPage,
                        page: page,
                    }));
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
        <div className="doctor-appointment-history p-5">
            <h1>Appointment History</h1>
            <hr />
            {!appointmentData
                ?
                <div className="d-flex align-items-center justify-content-center">
                    <h1>We are creating data table ...</h1>
                    <div className="spinner-border mx-5" role="status" aria-hidden="true"></div>
                </div>
                :
                <>
                    <div className="mb-4">
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
                                            state: e.target.value
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
                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>User</th>
                                    <th>FullName</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>State</th>
                                    <th>Service</th>
                                    <th>Phone</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.patient.baseUser.userName}</td>
                                        <td>{value.patient.baseUser.fullName}</td>
                                        <td>{value.date.split("T")[0]}</td>
                                        <td>{value.time}</td>
                                        <td>{value.state}</td>
                                        <td >{value.service.serviceName}</td>
                                        <td >{value.patient.baseUser.phoneNumber}</td>
                                        <td >
                                            <Link
                                                to={`/receptionist/appointment-detail/${value.id}`}
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
                        page={currentPage}
                        total_pages={appointmentData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>}
        </div>
    </>);
}

export default ReceptionistAppointmentHistory;