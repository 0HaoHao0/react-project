import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteService } from "../../../services/admin/service/apiService";

function ServiceDetail() {
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
                await deleteService(state.id);
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
            <div className="row">
                <h1>Service Detail</h1>
            </div>
            <hr />
            <div className="row text-center">
                <div>
                    <img height='200px' width='200px' src={state.imageURL} alt="DeviceImage" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-xs-12">
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">Id</label>
                        <input type="text" className="form-control" id="id" value={state.id} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="serviceCode" className="form-label">Service Code</label>
                        <input type="text" className="form-control" id="serviceCode" value={state.serviceCode} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="serviceName" className="form-label">Service Name</label>
                        <input type="text" className="form-control" id="serviceName" value={state.serviceName} readOnly></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type='number' className="form-control" id="price" value={state.price} readOnly></input>
                    </div>
                </div>
                <div className="col-lg-6 col-xs-12">

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date </label>
                        <input type="text" className="form-control" id="date" value={formatDate(state.date)} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="timeCreated" className="form-label">Time Created </label>
                        <input type="text" className="form-control" id="timeCreated" value={formatDate(state.timeCreated)} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastTimeModified" className="form-label">Last Modified </label>
                        <input type="text" className="form-control" id="lastTimeModified" value={formatDate(state.lastTimeModified)} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows={3} value={state.description} readOnly />
                    </div>

                </div>
            </div>

            <div className="row">
                <h4 className="alert alert-secondary">Devices</h4>
                {state.devices.map((device) =>
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
            <div className="row">
                <div className="col-6">
                    <Link to={'/admin/service/update'} state={state} className="btn btn-primary">Update</Link>

                </div>
                <div className="col-6">
                    <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>

                </div>
            </div>
        </div>
    </>);
}

export default ServiceDetail;