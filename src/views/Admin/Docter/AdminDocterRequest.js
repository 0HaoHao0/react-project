import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DocterGetMajors, DocterRequest } from "../../../services/AdminApiConnection/adminDoctorApi";


function AdminDocterRequest() {
    const navigate = useNavigate();

    const location = useLocation();

    const [majors, setMajors] = useState([]);

    let docterData = {
        id: location.state.id,
        major: null,
        certificateFile: []
    }
    // Get Data
    const getData = async (page) => {
        //Get Divice List
        await DocterGetMajors((response) => setMajors(response.data));
    }

    useEffect(() => {
        getData();
    }, [])


    //Create
    const handleCreate = async () => {
        let data = new FormData();

        data.append('id', docterData.id);
        data.append('major', docterData.major);
        data.append('certificateFile', docterData.certificateFile);
        data.append('verified', false);

        let res = await DocterRequest(data);
        if (res.status === 200) {
            toast.success("Create Success");
            navigate('/admin/docter')
        }
        else {
            toast.error("Please try again or contact with admin !")
        }
    }

    //Back
    const handleBack = () => {
        navigate('/admin/docter');
    }

    return (
        <>
            <div className="admin-docter-create">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                        Docter Request
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Docter Infomation</h3>
                            <div className="col-12 col-md-6">

                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> ID :</label>
                                    <input type="text" className="form-control " value={location.state.id}
                                        onChange={(e) => { docterData.id = e.target.value }}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Major :</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { docterData.major = parseInt(e.target.value) }}>
                                        <option defaultValue={null} >Open this select menu</option>
                                        {
                                            majors.map(item =>
                                                <option key={item.id} value={item.id}>
                                                    {item.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group  my-2">
                                    <label className="form-label fw-bold"> CertificateFile :</label>
                                    <input className="form-control" type="file" accept=".pdf" id="formFile"
                                        onChange={(e) => { docterData.certificateFile = e.target.files[0] }} />
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

export default AdminDocterRequest;