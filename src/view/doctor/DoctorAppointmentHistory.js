import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Pagiation from "../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { getAllAppointment } from "../../services/doctor/DoctorApi";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Swal from "sweetalert2";

function DoctorAppointmentHistory() {
    const rendered = useRef(false);

    const [appointmentData, setAppointmentData] = useState();
    const user = useSelector((state) => state.user);

    const currentPage = appointmentData ? appointmentData.page : null;
    const totalPage = appointmentData ? appointmentData.total_pages : null;


    const [filter, setFilter] = useState({
        pageSize: 5,
        id: user.userInfo.id,
        currentPage: currentPage,
    });




    useEffect(() => {
        const loadData = async () => {

            if (rendered.current) {
                Swal.fire({
                    icon: "info",
                    title: "Waiting for response..."
                });
                Swal.showLoading();
            }

            const res = await getAllAppointment(filter);

            setAppointmentData(res.data)

            $('#table').DataTable({
                destroy: true,
                retrieve: true,
                paging: false,
            });
            if (rendered.current) {
                Swal.close();
            }
        };

        loadData();

        return () => {
            rendered.current = true
        }
    }, [filter]);


    // Pagination
    const peviousPage = () => {
        setFilter((peviousPage) => ({
            ...peviousPage,
            currentPage: currentPage - 1
        }));
    }
    const nextPage = (e) => {
        setFilter((peviousPage) => ({
            ...peviousPage,
            currentPage: currentPage + 1
        }));
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
                        currentPage: page,
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
                    <div className="overflow-auto mb-4">

                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="table-dark">
                                    <th className="text-nowrap">Patient Name</th>
                                    <th>Phone Number</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>State</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td className="text-nowrap " >{value.patient.baseUser.fullName}</td>
                                        <td>{value.patient.baseUser.phoneNumber}</td>
                                        <td>{value.date.split("T")[0]}</td>
                                        <td >{value.time}</td>
                                        <td>{value.state}</td>
                                        <td >
                                            <Link
                                                to={`/doctor/appointment-detail/${value.id}`}
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
                </>}



        </div>
    </>);
}

export default DoctorAppointmentHistory;