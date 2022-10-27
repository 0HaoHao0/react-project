import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/views/Admin/Slidebar/SlidebarStyle.scss"
import { ContactDelete, ContactGetAll } from "../../../services/AdminApiConnection/adminContactApi";

function AdminContact() {
    const [contactData, setContactData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // You can await here
            let response = await ContactGetAll();

            setContactData(response.data);
            // ...
        }
        fetchData();

    }, []);

    const handleDelete = async (id) => {
        let res = await ContactDelete(id);

        console.log(res);
    }

    return (<>
        <div className="admin-contact">
            <div className="card-admin card m-4 ">
                <h5 className="m-5 p-2 fw-bold border border-dark bg-light text-center">
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
                            <li className="page-item"><a className="page-link" href="/">1</a></li>
                            <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li>
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