import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DocterGetId, DocterGetMajors, DocterUpdate } from "../../../services/AdminApiConnection/adminDoctorApi";

function AdminDocterUpdate() {
    const param = useParams()

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const [docterMajor, setDoctorMajor] = useState([]);

    const [docterCer, setDoctorCer] = useState([]);


    const [majors, setMajors] = useState([]);

    let docterData = {
        id: param.id,
        major: null,
        verified: null,
        certificateFile: []
    }


    // Get 

    const getData = async (id) => {
        await DocterGetId(id, (response) => { setData(response.data); setDoctorMajor(response.data.major); setDoctorCer(response.data.certificate) });

        await DocterGetMajors((response) => setMajors(response.data))
    }

    useEffect(() => {
        getData(param.id)
    }, [param.id]);


    useEffect(() => {
        docterData.major = docterMajor.id
        docterData.verified = data.verified
    },);


    //Update
    const handleUpdate = async () => {
        console.log(docterData);
        let data = new FormData()
        data.append('id', docterData.id);
        data.append('major', docterData.major);
        data.append('verified', docterData.verified);
        data.append('certificateFile', docterData.certificateFile);

        let res;
        await DocterUpdate(data, (response) => (res = response));
        console.log(res);
        if (res.status === 200) {
            toast.success("Update Success");
            navigate('/admin/docter');
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
            <div className="admin-docter-update">
                <div className="card-admin card m-4 ">
                    <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
                        Docter Update {param.id}
                    </h5>
                    <div className="px-5">
                        <div className="row">
                            <h3>Docter Infomation</h3>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Verified :</label>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => { e.target.value === '0' ? docterData.verified = true : docterData.verified = false }}>
                                        <option defaultValue={data.verified} hidden >{data.verified ? 'True' : 'False'}</option>
                                        <option value={'0'}>True</option>
                                        <option value={'1'}>False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group my-2">
                                    <label className="form-label fw-bold"> Major :</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { docterData.major = parseInt(e.target.value) }}>
                                        <option defaultValue={docterMajor.id} hidden >{docterMajor.name}</option>
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
                                    <h3>Certificate</h3>
                                    <label className="form-label fw-bold"> Current File :</label>
                                    <a href={docterCer.fileURL} className='btn btn-primary mx-4' target="_blank" rel="noreferrer">View</a>
                                    <br />
                                    <label className="form-label fw-bold"> Update File :</label>
                                    <input className="form-control" type="file" accept=".pdf" id="formFile"
                                        onChange={(e) => { docterData.certificateFile = e.target.files[0] }} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-success" onClick={() => handleUpdate()}>Update</button>
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

export default AdminDocterUpdate