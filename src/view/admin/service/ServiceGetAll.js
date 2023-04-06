import { useState } from "react";
import { toast } from "react-toastify";
import { getAllService, hiddenService, publicService } from "../../../services/admin/service/apiService";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ServiceGetAll() {

    const [serviceData, setServiceData] = useState();
    const [isReset, setIsReset] = useState(1);

    const currentPage = serviceData ? serviceData.page : 1;
    const totalPage = serviceData ? serviceData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,

        code: null,
        name: null,
        minPrice: null,
        maxPrice: null

    });

    useEffect(() => {

        const loadData = async () => {

            Swal.fire({
                icon: "info",
                title: "Waiting for response..."
            });
            Swal.showLoading();
            const res = await getAllService({ params: filter });
            if(res.status === 200) {
                setServiceData(res.data);
            }
            else {
                toast.error("Something wrong!");
            }
            Swal.close();
        };

        loadData();

        return () => {

        }
    }, [isReset, filter]);

    const handleState = (id, isPublic) => {
        if (isPublic) {
            Swal.fire({
                title: 'Are you sure?',
                html: 'Do you want to block this service?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await hiddenService(id);
                    Swal.close()
                    if (res.status === 200) {
                        toast.success("Succesfull !")
                        setIsReset(isReset + 1);
                    }
                    else {
                        toast.error('Something was wrong !')
                    }
                } else {
                    // Do something if Cancel button is clicked
                }
            });
        }
        else {
            Swal.fire({
                title: 'Are you sure?',
                html: 'Do you want to un-block this service?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await publicService(id);
                    Swal.close()
                    if (res.status === 200) {
                        toast.success('Succesfull !')
                        setIsReset(isReset - 1);
                    }
                    else {
                        toast.error('Something was wrong !')
                    }
                } else {
                    // Do something if Cancel button is clicked
                }
            });
        }
    }

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
            {!serviceData ? (
                <>
                    <div className="row g-0">
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
                    <div className="row g-0">
                        <div className="col-6">
                            <h1>Service Management</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>
                        </div>
                    </div>
                    <hr />
                    <form className="d-flex justify-content-end gap-2">
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by Code" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            code: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by Name" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            name: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="number" min={0} max={2147483647} placeholder="Min Price"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            minPrice: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="number" min={0} max={2147483647} placeholder="Max Price"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            maxPrice: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                    </form>
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>Service Name</th>
                                    <th>Service Code</th>
                                    <th>Price</th>
                                    <th>State</th>
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
                                        {
                                            value.isPublic
                                                ?
                                                <button className="btn btn-success" key={'public'} type="button" onClick={() => handleState(value.id, value.isPublic)}><i className="fa-solid fa-lock-open"></i></button>
                                                :
                                                <button className="btn btn-danger" key={'block'} type="button" onClick={() => handleState(value.id, value.isPublic)}><i className="fa-solid fa-lock"></i></button>

                                        }
                                        </td>
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