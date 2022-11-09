import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../styles/views/Admin/Slidebar/SlidebarStyle.scss"
import { ContactDelete, ContactGetAll } from "../../../services/AdminApiConnection/adminContactApi";
import Swal from "sweetalert2";

function AdminContact() {
    const [data, setData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    const fetchContact = async (currentPage) => {
        let response = await ContactGetAll(currentPage);
        setData(response.data)
        setContactData(response.data.data);
    }

    useEffect(() => {
        fetchContact(currentPage);
    }, [currentPage]);

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
                let res = await ContactDelete(id);
                if (res.status === 200) {
                    toast.success(res.data);
                    fetchContact();
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
    return (<>
        <div className="admin-contact">
            <div className="card-admin card m-4 ">
                <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                    Contact Management
                </h5>
                <div className="p-4">
                    <table className="table bg-light  table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>Detail</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contactData.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.email}</td>
                                        <td className="fw-bold">{item.state}</td>
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
                            {loadPagination(data.total_pages)}
                            <li className="page-item">
                                <a className="page-link" href="/">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </>);
}

export default AdminContact;