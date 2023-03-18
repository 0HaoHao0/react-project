import { useEffect } from "react";
import { useState } from "react";
import Pagiation from "../../../components/admin/Pagination";
import { getAllContact } from "../../../services/admin/contact/apiContact";
import ContactFilter from "./ContactFilter";


//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import DataLoading from "../../../components/admin/DataLoading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ContactGetAll() {
    const [contactData, setContactData] = useState();

    const currentPage = contactData ? contactData.page : null;
    const totalPage = contactData ? contactData.total_pages : null;

    const [filterData, setFilterData] = useState({
        from: null,
        to: null,
        state: null,
        keyword: null,
    });

    const loadData = async ({ page }) => {

        const res = await getAllContact({
            page: page,
            from: filterData.from,
            to: filterData.to,
            state: filterData.state,
            keyword: filterData.keyword
        });

        if(res.status === 200) {
            setContactData(res.data);
        }
        else {
            toast.error("Something went wrong!");
        }

    }

    useEffect(() => {
        loadData({
            page: 1
        });

    }, [filterData]);

    // Pagination
    const peviousPage = (e) => {
        loadData({
            page: currentPage - 1
        });
    }

    const nextPage = (e) => {
        loadData({
            page: currentPage + 1
        });
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
                    loadData(e.target.value);
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
        <div className="contact-getall">
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

                    <ContactFilter filterData={filterData} setFilterData={setFilterData} />

                    <div className="overflow-auto mb-4">

                        <table id="table" className="table table-hover" >
                            <thead>
                                <tr className="bg-dark">
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
                                            <td><button className={`btn ${value.state === "Pending" ? "btn-danger" : value.state === "Done" ? "btn-primary" : "btn-warning"}`}>{value.state}</button> </td>
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