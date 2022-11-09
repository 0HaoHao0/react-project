import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DeviceDelete, DeviceGetAll } from "../../../services/AdminApiConnection/adminDeviceApi";



function AdminDevice() {
    const [deviceData, setDeviceData] = useState([])

    const [deviceArray, setDeviceArray] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    // Get all devices
    const featchDevices = async (currentPage) => {
        let res = await DeviceGetAll(currentPage);

        setDeviceArray(res.data.data)
        setDeviceData(res.data);
    }


    useEffect(() => {
        featchDevices(currentPage);
    }, [currentPage])

    // Delete Devices
    const handleDelete = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await DeviceDelete(id);
                if (res.status === 200) {
                    toast.success(res.data);
                    featchDevices();
                }
                else {
                    toast.error("Please try again or contact with admin !")
                }
            }
        })

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
            <div className="admin-device">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Device Management
                    </h5>

                    <div className="p-4">
                        <Link to={'create'} className="btn btn-success">Create</Link>
                        <hr />
                        <table className="table bg-light  table-striped" id="table-device">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Device Name</th>
                                    <th>Device value</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deviceArray.map((item, index) =>
                                        <tr key={index}>
                                            <td><Link to={`/admin/device/update/${item.id}`} className="rounded-circle"><i className="fa fa-pen"></i></Link> {item.id}</td>
                                            <td>{item.deviceName}</td>
                                            <td>{item.deviceValue}</td>
                                            <td>{item.status === true ? 'True' : 'False'}</td>
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
                                {loadPagination(deviceData.total_pages)}
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

export default AdminDevice;