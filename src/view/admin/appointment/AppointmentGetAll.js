import { useState } from "react";
import { toast } from "react-toastify";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllAppointment } from "../../../services/admin/appointment/apiAppointment";

function AppointmentGetAll() {

    const [appointmentData, setAppointmentData] = useState();


    const currentPage = appointmentData ? appointmentData.page : null;
    const totalPage = appointmentData ? appointmentData.total_pages : null;

    const loadData = async (page) => {
        const res = await getAllAppointment(page);

        setAppointmentData(res.data);

        $('#table').DataTable({
            destroy: true,
            retrieve: true,
            paging: false,
            ordering: false,
        });
    };



    useEffect(() => {

        loadData();

        return () => {

        }
    }, []);


    // Pagination
    const peviousPage = () => {
        loadData(currentPage - 1);
    }
    const nextPage = (e) => {
        loadData(currentPage + 1);
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
                    loadData(e.target.value);
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
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="table-dark">
                                    <th>Doctor Name</th>
                                    <th>Patient Name</th>
                                    <th>Service Name</th>
                                    <th>Date</th>
                                    <th>From</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.doctor.baseUser.fullName}</td>
                                        <td>{value.patient.baseUser.fullName}</td>
                                        <td>{value.service.serviceName}</td>
                                        <td>{value.date.split("T")[0]}</td>
                                        <td>{value.from.split("T")[1]}</td>
                                        <td>
                                            <Link
                                                to="detail"
                                                state={value}
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