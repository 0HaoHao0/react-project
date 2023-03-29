import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteNews } from "../../../services/admin/news/apiNew";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function NewsDetail() {
    let { state } = useLocation();
    const navigate = useNavigate()

    const handleDelete = () => {
        Swal.fire({
            title: 'Are You Sure ?',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'OK',
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng bấm OK
                Swal.fire({
                    title: "Loading...",
                    html: "Please wait a moment"
                })
                Swal.showLoading()
                await deleteNews(state.id);
                Swal.close();
                toast.success("Delete Successful!");
                navigate("/admin/news");
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Delete cancelled");
            }
        });
    }


    //Convert Date
    const formatDate = (dateString) => {
        return moment(dateString).format("DD-MM-YYYY");
    };

    return (<>
        <div className="news-detail m-5">
            <h1>News Detail</h1>
            <hr />
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input type="text" className="form-control bg-white" id="id" value={state.id} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control bg-white" id="title" value={state.title} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="creator" className="form-label">Createtor</label>
                            <input type="text" className="form-control bg-white" id="creator" value={state.creator} disabled></input>
                        </div>

                    </div>
                    <div className="col-lg-6 col-xs-12">

                        <div className="mb-3">
                            <label htmlFor="publishDate" className="form-label">Publish Date </label>
                            <input type="text" className="form-control bg-white" id="publishDate" value={formatDate(state.publishDate)} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="timeCreated" className="form-label">Time Created </label>
                            <input type="text" className="form-control bg-white" id="timeCreated" value={formatDate(state.timeCreated)} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastTimeModified" className="form-label">Last Modified </label>
                            <input type="text" className="form-control bg-white" id="lastTimeModified" value={formatDate(state.lastTimeModified)} disabled />
                        </div>


                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <div className="bg-white p-4 shadow-sm border">
                            <div className="ckeditor">
                                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: state.content }}></div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="row">
                    <h4 className="alert alert-secondary">Services</h4>
                    {state.services.map((service) =>
                        <div className="col-4 mb-2" key={service.id}>
                            <div className="card mb-2 h-100" >
                                <div className="card-body">
                                    <h5 >Id: {service.id}, {service.serviceCode}</h5>
                                    <p>{service.serviceName}</p>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
            <div className="row">
                <div className="col-6">
                    <Link to={'/admin/news/update'} state={state} className="btn btn-primary">Update</Link>

                </div>
                <div className="col-6">
                    <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>

                </div>
            </div>

        </div>
    </>);
}

export default NewsDetail;