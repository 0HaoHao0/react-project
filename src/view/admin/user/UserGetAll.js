import { useEffect, useState } from "react";
import { getAllUser, lock, unlock } from "../../../services/admin/user/apiUser";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function UserGetAll() {
    const [userData, setUserData] = useState();
    const [isReset, setIsReset] = useState(1);

    const currentPage = userData ? userData.page : null;
    const totalPage = userData ? userData.total_pages : null;

    const loadData = async (page) => {
        const res = await getAllUser(page);
        setUserData(res.data);

        $('#table').DataTable({
            destroy: true,
            retrieve: true,
            paging: false,
            ordering: false,
        });
    };



    useEffect(() => {

        loadData();

        return () => {

        }
    }, [isReset]);

    //handle

    const handleAccess = (isLock, id) => {
        if (isLock === false) {
            Swal.fire({
                title: 'Lock Information',
                html:
                    '<div>' +
                    '<div class="mb-3">' +
                    '<label for="reason" class="form-label">Reason</label>' +
                    '<input type="text" class="form-control" id="reason">' +
                    '</div>' +
                    '<div class="mb-3">' +
                    '<label for="expired" class="form-label">Expired</label>' +
                    '<input type="date" class="form-control" id="expired">' +
                    '</div>' +
                    '</div>',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Submit'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const htmlContainer = Swal.getHtmlContainer();
                    const reason = htmlContainer.querySelector('#reason').value;
                    const expired = htmlContainer.querySelector('#expired').value;

                    //Call api
                    const res = await lock(reason, expired, id)
                    toast.success(res.data)
                    setIsReset(isReset + 1);
                }
            })
        }

        else if (isLock === true) {
            Swal.fire({
                title: 'Are You Sure ?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    //Call api
                    const res = await unlock(id)
                    toast.success(res.data)
                    setIsReset(isReset - 1);
                }
            })
        }
    }

    // Pagination
    const peviousPage = () => {
        loadData(currentPage - 1);
    }
    const nextPage = (e) => {
        loadData(currentPage + 1);
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

    return (
        <>
            <div className="user-getall">
                {!userData ? (
                    <>
                        <div>
                            <h1>User Management</h1>
                        </div>
                        <hr />
                        <DataLoading></DataLoading>
                    </>
                ) : (
                    <>
                        <div>
                            <h1>User Management</h1>
                        </div>
                        <hr />
                        <div className="overflow-auto mb-4">
                            <table id="table" className="table table-hover">
                                <thead>
                                    <tr className="bg-dark">
                                        <th>User Name</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Role</th>
                                        <th>Access</th>
                                        <th>More</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.data.map((value) => (
                                        <tr key={value.id}>
                                            <td>{value.userName}</td>
                                            <td>{value.fullName}</td>
                                            <td>{value.email}</td>
                                            <td>{value.phoneNumber}</td>
                                            <td>{value.role}</td>
                                            <td>{value.isLock
                                                ?
                                                <button className="btn btn-danger" key={"danger"} onClick={() => handleAccess(value.isLock, value.id)}><i className="fa-solid fa-lock"></i></button>
                                                :
                                                <button className="btn btn-success" key={'success'} onClick={() => handleAccess(value.isLock, value.id)}><i className="fa-solid fa-lock-open"></i></button>
                                            }</td>
                                            <td>
                                                <Link
                                                    to="detail"
                                                    state={value}
                                                    className="btn btn-success"
                                                >
                                                    <i className="fa-solid fa-circle-info"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagiation
                            page={userData.page}
                            total_pages={userData.total_pages}
                            previousPage={peviousPage}
                            nextPage={nextPage}
                            enterPage={enterPage}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default UserGetAll;
