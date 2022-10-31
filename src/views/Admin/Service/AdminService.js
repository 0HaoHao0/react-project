import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ServiceDelete, ServiceGetAll } from "../../../services/AdminApiConnection/adminServiceApi";



function AdminService() {
    const [serviceData, setServiceData] = useState([])

    const [serviceArray, setServiceArray] = useState([])

    // Get all services
    const getServices = async (page) => {
        let res = await ServiceGetAll(page);

        setServiceArray(res.data.data)
        setServiceData(res.data);
    }

    useEffect(() => {
        getServices();
    }, [])



    // Delete Services
    const handleDelete = async (id) => {
        const res = await ServiceDelete(id);
        if (res.status === 200) {
            toast.success(res.data);
            getServices();
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    // Pagination
    const loadPagination = (totalPage) => {
        let render = [];
        for (let i = 1; i <= totalPage; i++) {
            render.push(<li key={i} className="page-item"><a className="page-link" href="/">{i}</a></li>)
        }
        return render;
    }
    return (
        <>
            <div className="admin-service">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Service Management
                    </h5>

                    <div className="p-4">
                        <Link to={'create'} className="btn btn-success">Create</Link>
                        <hr />
                        <table className="table bg-light  table-striped" id="table-service">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Service Code</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Detail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    serviceArray.map((item, index) =>
                                        <tr key={item.id}>
                                            <td><Link to={`update/${item.id}`} className="rounded-circle"><i className="fa fa-pen"></i></Link> {item.id}</td>
                                            <td>{item.serviceCode}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
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
                                {loadPagination(serviceData.total_pages)}
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

export default AdminService;