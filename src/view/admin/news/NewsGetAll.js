
import { useEffect, useRef, useState } from "react";

import DataLoading from "../../../components/admin/DataLoading";
import Pagiation from "../../../components/admin/Pagination";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllNews } from "../../../services/admin/news/apiNew";
import Swal from "sweetalert2";

function NewsGetAll() {
    const rendered = useRef(false)

    const [newsData, setNewsData] = useState();


    const currentPage = newsData ? newsData.page : 1;
    const totalPage = newsData ? newsData.total_pages : 0;

    const [filter, setFilter] = useState({
        page: currentPage,
        pageSize: 10,

        creator: null,
        title: null,
        startAt: null,
        endAt: null,

    });

    useEffect(() => {

        const loadData = async () => {
            if (rendered.current) {
                Swal.fire({
                    icon: "info",
                    title: "Waiting for response..."
                });
                Swal.showLoading();
            }

            let res = await getAllNews({ params: filter });
            if (res.status === 200) {
                setNewsData(res.data);
            }
            else {
                toast.error("Something went wrong, Plese try again ! ");
            }
            if (rendered.current) {
                Swal.close();
            }
        };

        loadData();
        return () => {
            rendered.current = true
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
        <div className="news-get-all m-5">
            {!newsData ? (
                <>
                    <div className="row g-0">
                        <div className="col-6">
                            <h1>News Management</h1>

                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>

                        </div>
                    </div>
                    <hr />
                    <DataLoading></DataLoading>
                </>
            ) : (
                <>
                    <div className="row g-0">
                        <div className="col-6">
                            <h1>News Management</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <Link to='create' className="btn  btn-success">Create</Link>
                        </div>
                    </div>
                    <hr />
                    <form className="d-flex justify-content-end gap-2">
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by Title" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            title: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3 w-25">
                            <input type="text" placeholder="Search by Creator" className="form-control w-fit"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter({
                                            ...filter,
                                            creator: e.target.value,
                                            page: 1,
                                        });
                                    }
                                }}
                            />
                        </div>

                    </form>
                    <div className="overflow-auto mb-4">
                        <table id="table" className="table table-hover">
                            <thead>
                                <tr className="table-dark">
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Creator</th>
                                    <th>Created</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newsData.data.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>{value.title}</td>
                                        <td>{value.creator}</td>
                                        <td>{new Date(value.timeCreated).toLocaleString()}</td>
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
                        page={filter.page}
                        total_pages={newsData.total_pages}
                        previousPage={peviousPage}
                        nextPage={nextPage}
                        enterPage={enterPage}
                    />
                </>
            )}
        </div>
    </>);
}

export default NewsGetAll;