import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DocterGetAll } from "../../../services/AdminApiConnection/adminDoctorApi";



function AdminDocter() {
    const [data, setData] = useState([])

    const [docterData, setDocterData] = useState([])


    const [currentPage, setCurrentPage] = useState(1)

    // Get all docters
    const getDocters = async (currentPage) => {
        await DocterGetAll(currentPage, (res) => {
            setData(res.data);
            setDocterData(res.data.data)
        });
    }

    useEffect(() => {
        getDocters(currentPage);
    }, [currentPage])




    // Delete Docters
    const handleDelete = async (id) => {
        // const res = await DocterDelete(id);
        // if (res.status === 200) {
        //     toast.success(res.data);
        //     getDocters();
        // }
        // else {
        //     toast.error("Please try again or contact with admin !")
        // }
    }

    // Pagination
    const loadPagination = (totalPage) => {
        let render = [];
        for (let i = 1; i <= totalPage; i++) {
            render.push(<li key={i} className="page-item"><span className="page-link" onClick={() => loadPage(i)}>{i}</span></li>)
        }
        return render;
    }

    // Load Page
    const loadPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <>
            <div className="admin-docter">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Docter Management
                    </h5>

                    <div className="p-4">
                        <Link to={'request'} state={{ id: 0 }} className="btn btn-success">Request</Link>
                        <hr />
                        <table className="table bg-light  table-striped" id="table-docter">
                            <thead className="table-dark">
                                <tr>
                                    <th>Doctor User Name</th>
                                    <th>Full Name</th>
                                    <th>Major</th>
                                    <th>Verified</th>
                                    <th>Detail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    docterData.map((item, index) =>
                                        <tr key={index}>
                                            <td><Link to={`update/${item.id}`} className="rounded-circle"><i className="fa fa-pen"></i></Link> {item.baseUser.userName}</td>
                                            <td>{item.baseUser.fullName}</td>
                                            <td>{item.major.name}</td>
                                            <td>{item.verified === true ? 'True' : 'False'}</td>
                                            <td><Link to={`${item.id}`} className="btn btn-primary">Detail</Link></td>
                                            <td><button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div >
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end px-4">
                                <li className="page-item disabled">
                                    <span className="page-link" tabIndex="-1" aria-disabled="true">Previous</span>
                                </li>
                                {loadPagination(data.total_pages)}
                                <li className="page-item">
                                    <span className="page-link" >Next</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDocter;