import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RoomGetAll } from "../../../services/AdminApiConnection/adminRoomApi";



import $ from 'jquery'

function AdminRoom() {
    const [roomData, setRoomData] = useState([])

    const pageInfo = {
        page: null,
        per_Page: null,
        total: null,
        total_pages: null
    }


    const featchRoom = async (page) => {
        let res = await RoomGetAll(page);

        setRoomData(res.data.data);

    }

    useEffect(() => {
        featchRoom(1);

    }, [])

    const handleDelete = () => { }

    const loadPagination = (totalPage) => {
        console.log(totalPage);
        let render = [];
        for (let i = 1; i <= 10; i++) {
            render.push(<li className="page-item"><a className="page-link" href="/">{i}</a></li>)
        }
        return render;
    }
    return (
        <>
            <div className="admin-room">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Room Management
                    </h5>
                    <div className="p-4">
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
                                    roomData.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.roomCode}</td>
                                            <td>{item.description}</td>
                                            <td><Link to={`${item.id}`} className="btn btn-success">Detail</Link></td>
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
                                {loadPagination(pageInfo.total_pages)}
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