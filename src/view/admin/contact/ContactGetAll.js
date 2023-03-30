import { useEffect } from "react";
import { useState } from "react";
import Pagiation from "../../../components/admin/Pagination";
import { getAllContact } from "../../../services/admin/contact/apiContact";
import ContactFilter from "./ContactFilter";


//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import DataLoading from "../../../components/admin/DataLoading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ContactGetAll() {
    const [contactData, setContactData] = useState();

    const currentPage = contactData ? contactData.page : null;
    const totalPage = contactData ? contactData.total_pages : null;

    const [filter, setFilter] = useState({
        from: null,
        to: null,
        state: null,
        keyword: null,
        page: currentPage,
    });


    useEffect(() => {

        const loadData = async (filter) => {
            const res = await getAllContact(
                filter
            );

            if (res.status === 200) {
                setContactData(res.data);
            }
            else {
                toast.error("Something went wrong!");
            }

        }

        loadData(filter);

    }, [filter]);

    // Pagination
    const peviousPage = (e) => {
        setFilter((peviousPage) => ({
            ...peviousPage,
            page: currentPage - 1
        }));
    }

    const nextPage = (e) => {
        setFilter((peviousPage) => ({
            ...peviousPage,
            page: currentPage + 1
        }));
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
                    const page = e.target.value
                    setFilter((peviousPage) => ({
                        ...peviousPage,
                        page: page,
                    }));
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
        <div className="contact-getall p-5">
            {!contactData
                ?
                <>
                    <div>
                        <h1>Contact Management</h1>
                    </div>
                    <hr />
                    <DataLoading></DataLoading>
                </>
                :
                <>
                    <div>
                        <h1>Contact Management</h1>
                    </div>
                    <hr />

                    <ContactFilter filter={filter} setFilter={setFilter} />

                    <div className="overflow-auto mb-4">

                        <table id="table" className="table table-hover" >
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Date</th>
                                    <th className="text-center">State</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactData.data.map((value, index) =>
                                        <tr key={index}>
                                            <td>{value.id}</td>
                                            <td>{value.name}</td>
                                            <td>{value.phoneNumber}</td>
                                            <td>{value.timeCreated.slice(0, 10)}</td>
                                            <td className="text-center"><div className={` ${value.state === "Pending" ? "badge bg-danger" : value.state === "Done" ? "badge bg-primary" : "badge bg-warning text-dark"}`}>{value.state}</div> </td>
                                            <td><Link to='detail' state={value} className="btn btn-success"><i className="fa-solid fa-circle-info"></i></Link></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <Pagiation
                        page={contactData.page}
                        total_pages={contactData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>}
        </div>
    </>);
}

export default ContactGetAll;