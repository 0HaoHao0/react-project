import { useState } from "react";
import { toast } from "react-toastify";
import { getAllRoom } from "../../../services/admin/room/apiRoom";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function RoomGetAll() {

    const [roomData, setRoomData] = useState();
    const currentPage = roomData ? roomData.page : 1;
    const totalPage = roomData ? roomData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,
    });


    useEffect(() => {

        const loadData = async () => {
            const res = await getAllRoom({
                params: filter
            });
            setRoomData(res.data);
    
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
            {!roomData ? (
                <>
                    <div className="row g-0">
                        <div className="col-6">
                            <h1>Room Management</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <button className="btn  btn-success">Create</button>

                        </div>
                    </div>
                    <hr />
                    <DataLoading></DataLoading>
                </>
            ) : (
                <>
                    <div className="row g-0">
                        <div className="col-6">
                            <h1>Room Management</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover text-center">
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>Room Code</th>
                                    <th>State</th>
                                    <th>Room Category</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.roomCode}</td>
                                        <td>{value.roomType.name}</td>
                                        <td>{value.roomCategory?.name || "-- Not Set --"}</td>
                                        <td>
                                            <Link
                                                to={`detail/${value.id}`}
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
                        page={roomData.page}
                        total_pages={roomData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>
            )}
        </div>
    </>);
}

export default RoomGetAll;