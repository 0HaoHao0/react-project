import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteService, getServiceById } from "../../../services/admin/service/apiService";
import { useEffect, useState } from "react";


function ServiceDetail() {
    let { id } = useParams();
    const [service, setService] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            const res = await getServiceById(id);

            if (res.status === 200) {
                setService(res.data)

            }
            else if (res.status < 500) {
                toast.error(res.data);
            }
            else {
                toast.error("Something went wrong !!!")
            }
        }

        loadData();

        return () => {
        }
    }, [id])



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
                await deleteService(service.id);
                Swal.close();
                toast.success("Delete Successful!");
                navigate("/admin/service");
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
        <div className="service-detail">
            <div className="row g-0">
                <h1>Service Detail</h1>
            </div>
            <hr />
            {service &&
                <div className="container">
                    <div className="row g-0 text-center">
                        <div>
                            <img height='200px' width='200px' src={service.imageURL} alt="DeviceImage" />
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-lg-6 col-xs-12">
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label">Id</label>
                                <input type="text" className="form-control" id="id" value={service.id} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serviceCode" className="form-label">Service Code</label>
                                <input type="text" className="form-control" id="serviceCode" value={service.serviceCode} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serviceName" className="form-label">Service Name</label>
                                <input type="text" className="form-control" id="serviceName" value={service.serviceName} readOnly></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type='number' className="form-control" id="price" value={service.price} readOnly></input>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">

                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date </label>
                                <input type="text" className="form-control" id="date" value={formatDate(service.date)} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="timeCreated" className="form-label">Time Created </label>
                                <input type="text" className="form-control" id="timeCreated" value={formatDate(service.timeCreated)} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastTimeModified" className="form-label">Last Modified </label>
                                <input type="text" className="form-control" id="lastTimeModified" value={formatDate(service.lastTimeModified)} readOnly />
                            </div>


                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <div className="bg-white p-4 shadow-sm border">
                                <div className="ckeditor">
                                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: service.description }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2">
                        <h4 className="alert alert-secondary">Devices</h4>
                        {service.devices.map((device) =>
                            <div className="col-4" key={device.id}>
                                <div className="card" >
                                    <div className="card-body">
                                        <h5 >Id: {device.id}</h5>
                                        <p className="card-text">Service Code: {device.name}</p>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="row g-2 my-2">
                        <div className="col-6">
                            <Link to={'/admin/service/update'} state={service} className="btn btn-primary">Update</Link>

                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            }
        </div>

    </>);
}

export default ServiceDetail;