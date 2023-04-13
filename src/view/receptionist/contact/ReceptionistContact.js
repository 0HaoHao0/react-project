import { useEffect } from "react";
import { useState } from "react";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllContact } from "../../../services/receptionist/apiReceptionistContact";
import Swal from "sweetalert2";
import ContactFilter from "../../admin/contact/ContactFilter";

function ReceptionistContact() {
    const [contactData, setContactData] = useState();

    const currentPage = contactData ? contactData.page : 1;
    const totalPage = contactData ? contactData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,

        from: null,
        to: null,
        state: null,
        keyword: null,
    });


    useEffect(() => {

        const loadData = async (filter) => {

            Swal.fire({
                icon: "info",
                title: "Waiting to get data...",
            });
            Swal.showLoading();
            const res = await getAllContact(
                filter
            );

            if (res.status === 200) {
                setContactData(res.data);
            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error('Something went wrong, Please try again !!!');
            }
            Swal.close();

        }

        loadData(filter);

    }, [filter]);


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
        <div className=" receptionist-contact p-5">
            <h1>Contact Management</h1>
            <hr />

            {contactData
                ?

                <>
                    <ContactFilter filter={filter} setFilter={setFilter} />
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover" >
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Date</th>
                                    <th>State</th>
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
                                            <td className="text-center fst-normal"><div className={` ${value.state === "Pending" ? "badge rounded-pill bg-danger " : value.state === "Done" ? "badge rounded-pill bg-primary" : "badge rounded-pill bg-warning"}`} >{value.state}</div> </td>
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
                </>
                :
                <div className="d-flex align-items-center justify-content-center">
                    <h1>We are creating data table ...</h1>
                    <div className="spinner-border mx-5" role="status" aria-hidden="true"></div>
                </div>
            }

        </div>
    </>);
}

export default ReceptionistContact;