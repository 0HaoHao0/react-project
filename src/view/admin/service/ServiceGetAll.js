import { useState } from "react";
import { toast } from "react-toastify";
import { getAllService } from "../../../services/admin/service/apiService";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function ServiceGetAll() {

    const [serviceData, setServiceData] = useState();

    const currentPage = serviceData ? serviceData.page : null;
    const totalPage = serviceData ? serviceData.total_pages : null;

    const loadData = async (page) => {
        const res = await getAllService(page);

        setServiceData(res.data);

        $('#table').DataTable({
            destroy: true,
            retrieve: true,
            paging: false,
            ordering: false,
        });
    };



    useEffect(() => {
        $('#table').DataTable().destroy();

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
        <div className="doctor-getall">
            {!serviceData ? (
                <>
                    <div className="row">
                        <div className="col-6">
                            <h1>Service Management</h1>

                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>

                        </div>
                    </div>
                    <hr />
                    <DataLoading></DataLoading>
                </>
            ) : (
                <>
                    <div className="row">
                        <div className="col-6">
                            <h1>Service Management</h1>

                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>

                        </div>
                    </div>
                    <hr />
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="bg-dark">
                                    <th>Id</th>
                                    <th>Service Name</th>
                                    <th>Service Code</th>
                                    <th>Price</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.serviceName}</td>
                                        <td>{value.serviceCode}</td>
                                        <td>{value.price}</td>
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
                        page={serviceData.page}
                        total_pages={serviceData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>
            )}
        </div>
    </>);
}

export default ServiceGetAll;