import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllRoom, getRoomCategories, getRoomTypes } from "../../../services/admin/room/apiRoom";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function RoomGetAll() {
    const render = useRef(false);

    const [roomData, setRoomData] = useState();
    const currentPage = roomData ? roomData.page : 1;
    const totalPage = roomData ? roomData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,

        roomId: null,
        code: null,
        roomTypeId: null,
        categoryId: null,

    });

    const [categories, setCategories] = useState([]);
    const [roomStates, setRoomStates] = useState([]);

    useEffect(() => {



        const loadData = async () => {
            const res = await getAllRoom({
                params: filter
            });

            if (res.status === 200) {
                setRoomData(res.data);
            }
            else {
                toast.error("Cannot get room data, Please try again!");
            }
        };

        if (render.current === true) {
            loadData();
        }

        return () => {
            render.current = true;
        }
    }, [filter]);

    useEffect(() => {
        const loadRoomStates = async () => {
            let res = await getRoomTypes();
            if (res.status === 200) {
                setRoomStates(res.data);
            }


            getRoomCategories(res => {
                if (res.status === 200) {
                    setCategories(res.data);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Somedata wrong!");
                }
            });
        }

        if (render.current === true) {
            loadRoomStates();
        }

        return () => {
            render.current = true;
        }
    }, [])





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
                            <Link to={"create"} className="btn btn-success">Create</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="filter mb-4 row justify-content-end">
                        <div className="col-lg-3 mb-2">
                            <input type="number" placeholder="Search by Id" className="form-control"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            roomId: e.target.value,
                                            page: 1
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="col-lg-3 mb-2">
                            <input type="text" placeholder="Search by Code" className="form-control"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            code: e.target.value,
                                            page: 1
                                        });
                                    }
                                }}
                            />
                        </div>

                        <div className="col-lg-3 mb-2">
                            <select className="p-2 rounded w-100" onChange={(e) => {
                                if (e.target.value === "default") {
                                    setFilter({
                                        ...filter,
                                        roomTypeId: null
                                    });
                                }
                                else {
                                    setFilter({
                                        ...filter,
                                        roomTypeId: e.target.value,
                                        page: 1,
                                    });
                                }
                            }}>
                                <option value="default" className="text-secondary">--- Choose State ---</option>
                                {
                                    roomStates.map(item =>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-lg-3 mb-2">
                            <select className="p-2 rounded w-100" onChange={(e) => {
                                if (e.target.value === "default") {
                                    setFilter({
                                        ...filter,
                                        categoryId: null
                                    });
                                }
                                else {
                                    setFilter({
                                        ...filter,
                                        categoryId: e.target.value,
                                        page: 1,
                                    });
                                }
                            }}>
                                <option value="default" className="text-secondary">--- Choose Categogy ---</option>
                                {
                                    categories.map(item =>
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>


                    </div>
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
                        page={filter.page}
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