import { useEffect, useRef } from "react";
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
    const render = useRef()
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

        const loadData = async () => {


            const res = await getAllContact({ params: filter });

            if (res.status === 200) {
                setContactData(res.data);
            }
            else {
                toast.error("Cannot load data, Please try again!");
            }

        }
        if (render.current === true) {
            loadData();
        }


        return () => {
            render.current = true;
        }
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