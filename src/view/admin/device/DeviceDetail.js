import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteDevice, getDeviceDetail } from "../../../services/admin/device/apiDevice";
import { useState } from "react";
import { useEffect } from "react";

function DeviceDetail() {
    let { state } = useLocation();
    const navigate = useNavigate()

    const [deviceInfo, setDeviceInfo] = useState(state);

    useEffect(() => {

        const getData = async () => {
            let res = await getDeviceDetail({ id: state.id });
            if(res.status === 200) {
                setDeviceInfo(res.data);
            }
            else {
                toast.error("Something wrong!");
            }
        }

        getData();

    }, [state.id]);

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
                await deleteDevice(state.id);
                toast.success("Delete Successful!");
                navigate("/admin/device");
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
        <div className="device-detail p-5">
            <h1>Device Detail</h1>
            <hr />
            <div className="container-fluid">
                <div className="row text-center">
                    <div>
                        <img height='200px' width='200px' src={deviceInfo.imageURL} alt="DeviceImage" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input type="text" className="form-control" id="id" value={deviceInfo.id} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deviceName" className="form-label">Device Name</label>
                            <input type="text" className="form-control" id="deviceName" value={deviceInfo.deviceName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deviceValue" className="form-label">Device Value</label>
                            <input type="number" className="form-control" id="deviceValue" value={deviceInfo.deviceValue} readOnly></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Active</label>
                            <input className="form-control" id="status" value={deviceInfo.status} readOnly></input>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date </label>
                            <input type="text" className="form-control" id="date" value={formatDate(deviceInfo.date)} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows={3} value={deviceInfo.description} readOnly />
                        </div>

                    </div>
                </div>
                <div className="row">
                    <h4 className="alert alert-secondary">Room</h4>
                    <div className="col-4 mb-2">
                        <div className="card" >
                            <div className="card-body">
                                <h5 >Id: {deviceInfo.room.id}</h5>
                                <p className="card-text">Room Code: {deviceInfo.room.roomCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h4 className="alert alert-secondary">Services</h4>
                    {deviceInfo.services.map((service) =>
                        <div className="col-4 mb-2" key={service.id}>
                            <div className="card" >
                                <div className="card-body">
                                    <h5 >Id: {service.id}</h5>
                                    <p className="card-text">Service Code: {service.serviceCode}</p>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
                <div className="row">
                    <div className="col-6">
                        <Link to={'/admin/device/update'} state={deviceInfo} className="btn btn-primary">Update</Link>

                    </div>
                    <div className="col-6">
                        <button className="btn btn-danger ms-auto" onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default DeviceDetail;