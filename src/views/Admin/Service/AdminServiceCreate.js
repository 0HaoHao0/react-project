import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ServiceCreate } from "../../../services/AdminApiConnection/adminServiceApi";

function AdminServiceCreate() {
    const navigate = useNavigate();

    let serviceData = {
        serviceCode: null,
        description: null,
        price: null,
    }

    //Create
    const handleCreate = async () => {
        console.log(serviceData);
        let res = await ServiceCreate(serviceData);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/admin/service')
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/service');
    }

    return (
        <>
            <div className="admin-service-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Service Create
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Service Infomation</h3>
                            <div className="col-12 col-md-6">

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Service Code :</label>
                                    <input type="text" className="form-control "
                                        onChange={(e) => { serviceData.serviceCode = e.target.value }}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold">Service Price :</label>
                                    <input type="number" className="form-control "
                                        onChange={(e) => { serviceData.price = parseInt(e.target.value) }}
                                    />
                                </div>

                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold">Service Description :</label>
                                    <textarea type="text" rows={10} className="form-control "
                                        onChange={(e) => { serviceData.description = e.target.value }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="row my-4">
                            <div className="col-6">
                                <button className="btn btn-success" onClick={() => handleCreate()}>Create</button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminServiceCreate;