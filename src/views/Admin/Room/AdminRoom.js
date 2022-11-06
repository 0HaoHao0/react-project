import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomDelete, RoomGetAll } from "../../../services/AdminApiConnection/adminRoomApi";





function AdminRoom() {
    const [roomData, setRoomData] = useState([])

    const [roomArray, setRoomArray] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    // Get all devices
    const featchRoom = async (currentPage) => {
        let res = await RoomGetAll(currentPage);

        setRoomArray(res.data.data)
        setRoomData(res.data);
    }


    useEffect(() => {
        featchRoom(currentPage);
    }, [currentPage])

    // Delete Devices

    const handleDelete = async (id) => {
        const res = await RoomDelete(id);
        if (res.status === 200) {
            toast.success(res.data);
            featchRoom();
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    // Pagination

    const loadPagination = (totalPage) => {
        let render = [];
        for (let i = 1; i <= totalPage; i++) {
            render.push(<li key={i} className="page-item"><a className="page-link" href="/" onClick={() => loadPage(i)}>{i}</a></li>)
        }
        return render;
    }


    // Load Page
    const loadPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (

        <>
            <div className="admin-room">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Room Management
                    </h5>

                    <div className="p-4">
                        <Link to={'create'} className="btn btn-success">Create</Link>
                        <hr />
                        <table className="table bg-light  table-striped" id="table-room">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Room Code</th>
                                    <th>Description</th>
                                    <th>Detail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roomArray.map((item, index) =>
                                        <tr key={item.id}>
                                            <td><Link to={`update/${item.id}`} className="rounded-circle"><i className="fa fa-pen"></i></Link> {item.id}</td>
                                            <td>{item.roomCode}</td>
                                            <td>{item.description}</td>
                                            <td><Link to={`${item.id}`} className="btn btn-primary text-white">Detail</Link></td>
                                            <td><button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div >
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end p-2">
                                <li className="page-item disabled">
                                    <a className="page-link" href="/" tabIndex="-1" aria-disabled="true">Previous</a>
                                </li>
                                {loadPagination(roomData.total_pages)}
                                <li className="page-item">
                                    <a className="page-link" href="/">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoom;