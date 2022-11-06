import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { UserDelete, UserGetAll } from "../../../services/AdminApiConnection/adminUserApi";



function AdminUser() {
    const [data, setData] = useState([])

    const [userData, setUserData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    // Get all users
    const getUsers = async (currentPage) => {
        await UserGetAll(currentPage, (res) => {
            setData(res.data)
            setUserData(res.data.data)
        });

    }

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage])



    // Delete Users
    const handleDelete = async (id) => {
        let response;

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
                await UserDelete(id, (res) => { response = res });
                if (response.status === 200) {
                    toast.success("Delete succecss");
                    getUsers();
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
            <div className="admin-user">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        User Management
                    </h5>

                    <div className="p-4">
                        <Link to={'create'} className="btn btn-success">Create</Link>
                        <hr />
                        <table className="table bg-light  table-striped" id="table-user">
                            <thead className="table-dark">
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Detail</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.map((item, index) =>
                                        <tr key={index}>
                                            <td><Link to={`update/${item.id}`} className="rounded-circle"><i className="fa fa-pen"></i></Link> {item.userName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.role}</td>
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

export default AdminUser;