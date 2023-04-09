import { useState } from "react";
import { toast } from "react-toastify";
import { getAllDevice } from "../../../services/admin/device/apiDevice";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function DeviceGetAll() {

    const [deviceData, setDeviceData] = useState();

    const currentPage = deviceData ? deviceData.page : 1;
    const totalPage = deviceData ? deviceData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,

        keyword: null,

    });

    useEffect(() => {

        const loadData = async () => {


            const res = await getAllDevice({ params: filter });
            if (res.status === 200) {
                setDeviceData(res.data);
            }
            else {
                toast.error("Cannot get device data...");
            }

        };

        loadData();

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
            {!deviceData ? (
                <>
                    <div className="row g-0">
                        <div className="col-6 ">
                            <h1>Device Management</h1>

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
                            <h1>Device Management</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>
                        </div>
                    </div>
                    <hr />
                    <form className="d-flex justify-content-end gap-2">
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by id, name, value, code..." className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            keyword: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>

                    </form>
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover text-center">
                            <thead>
                                <tr className="table-dark">
                                    <th>Device Id</th>
                                    <th>Device Name</th>
                                    <th>Device Value</th>
                                    <th>Room Code</th>
                                    <th>Active</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deviceData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.deviceName}</td>
                                        <td>{value.deviceValue}</td>
                                        <td>{value.room.roomCode}</td>
                                        <td>{value.status.toString()}</td>
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
                        page={filter.page}
                        total_pages={deviceData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>
            )}
        </div>
    </>);
}

export default DeviceGetAll;
