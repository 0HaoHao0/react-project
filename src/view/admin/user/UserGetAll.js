import { useEffect, useRef, useState } from "react";
import { getAllUser, lock, unlock } from "../../../services/admin/user/apiUser";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";
function UserGetAll() {
    const rendered = useRef(false)
    const [userData, setUserData] = useState();
    const [isReset, setIsReset] = useState(1);



    const currentPage = userData ? userData.page : 1;
    const totalPage = userData ? userData.total_pages : 0;

    const defaultFilter = {
        page: currentPage,
        pageSize: 10,
        userName: null,
        email: null,
        emailVerified: null,
        phoneNumber: null,
        isLock: null
    }

    const [filter, setFilter] = useState(defaultFilter);

    useEffect(() => {


        const loadData = async () => {
            if (rendered.current) {
                Swal.fire({
                    icon: "info",
                    title: "Waiting for response..."
                });
                Swal.showLoading();
            }


            let res = await getAllUser({
                params: filter
            });

            if (res.status === 200) {
                setUserData(res.data);
            } else {
                toast.error("System is busy!");
            }

            if (rendered.current) {
                Swal.close();
            }
        }

        loadData()

        return () => {
            rendered.current = true
        }


    }, [filter, isReset]);

    //handle
    const handleAccess = (isLock, id) => {
        let min = moment().add(1, 'day').format().split('T')[0]
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
                    `<input type="date" class="form-control" min='${min}'  id="expired">` +
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
                    Swal.fire({
                        icon: "info",
                        title: "Waiting for locking user!"
                    });
                    Swal.showLoading();
                    const res = await lock(reason, expired, id);
                    if (res.status === 200) {
                        toast.success(res.data);
                        setIsReset(isReset + 1);
                    }
                    else {
                        toast.error("System is busy!");
                    }
                    Swal.close();
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
                    Swal.fire({
                        icon: "info",
                        title: "Waiting for unlocking user!"
                    });
                    Swal.showLoading();
                    const res = await unlock(id);
                    if (res.status === 200) {
                        toast.success(res.data)
                        setIsReset(isReset - 1);
                    }
                    else {
                        toast.error("System is busy!");
                    }
                    Swal.close();

                }
            })
        }
    }

    // Pagination
    const peviousPage = (e) => {
        setFilter({
            ...filter,
            page: filter.page - 1
        });
    }
    const nextPage = (e) => {
        if (filter.page + 1 <= totalPage) {
            setFilter({
                ...filter,
                page: filter.page + 1
            });
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
                    })
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
            <div className="user-getall p-5">
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
                        <div className="filter row mb-4">
                            <div className="col-lg-3">
                                <input type="text" placeholder="Search by UserName" className="form-control"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFilter({
                                                ...filter,
                                                userName: e.target.value,
                                                page: 1
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-lg-3">
                                <input type="text" placeholder="Search by Email" className="form-control"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFilter({
                                                ...filter,
                                                email: e.target.value,
                                                page: 1
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-lg-3">
                                <input type="text" placeholder="Search by PhoneNumber" className="form-control"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setFilter({
                                                ...filter,
                                                phoneNumber: e.target.value,
                                                page: 1
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-lg-3">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="d-flex gap-2">
                                            <strong>Verified</strong>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterVerified" id="filterVerifiedTrue"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        emailVerified: true,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterVerifiedTrue">Only Verified</label>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterVerified" id="filterVerifiedFalse"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        emailVerified: false,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterVerifiedFalse">No Verified</label>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterVerified" id="filterVerified"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        emailVerified: null,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterVerified">Both</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="d-flex gap-2">
                                            <strong>Lock</strong>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterLocked" id="filterLockedTrue"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        isLock: true,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterLockedTrue">Only Locked</label>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterLocked" id="filterLockedFalse"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        isLock: false,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterLockedFalse">No Locked</label>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <input type="radio" name="filterLocked" id="filterLocked"
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        isLock: null,
                                                        page: 1
                                                    });
                                                }}
                                            />
                                            <label htmlFor="filterLocked">Both</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto mb-4 ">
                            <table id="table" className="table table-hover">
                                <thead>
                                    <tr className="table-dark">
                                        <th>User Name</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Role</th>
                                        <th>Verified</th>
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
                                            <td>{value.emailConfirmed ?
                                                <div className="btn btn-success">
                                                    <i className="fa-solid fa-check"></i>
                                                </div>
                                                :
                                                <div className="btn btn-outline-danger disabled">
                                                    <i className="fa-solid fa-x"></i>
                                                </div>
                                            }</td>
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
