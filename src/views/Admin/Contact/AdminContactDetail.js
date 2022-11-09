import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactChangeState, ContactGetId } from "../../../services/AdminApiConnection/adminContactApi";

function AdminContactDetail() {
    const param = useParams();
    const navigate = useNavigate();

    const [contactDetail, setContactDetail] = useState([]);

    let stateIndex = 0;

    const fetchContactId = async (id) => {
        let response = await ContactGetId(id);

        setContactDetail(response.data);
    }

    useEffect(() => {
        fetchContactId(param.id)
    }, [param.id]);

    // Conver Date 
    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj).toISOString().split('T')[0]

            return date;
        }
    }
    //Change State
    const selectState = (value) => {
        stateIndex = value;
    }


    const handleChangeState = async () => {
        let res = await ContactChangeState(param.id, parseInt(stateIndex));
        if (res.status === 200) {
            fetchContactId(param.id)
        }
    }



    //Back
    const handleBack = () => {
        navigate('/admin/contact');
    }
    return (<>
        <div className="admin-contact-detail">
            <div className="card-admin card m-4 ">
                <h5 className="m-5 p-2 fw-bold border border-dark bg-light" style={{ fontFamily: 'monospace' }}>
                    Contact Detail {param.id}
                </h5>
                <div className="px-5">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h3>User Infomation :</h3>
                            <div className="form-group my-2">
                                <label className="fw-bold">Email :</label> {contactDetail.email}
                            </div>

                            <div className="form-group my-2">
                                <label className="fw-bold">Name :</label> {contactDetail.name}
                            </div>

                            <div className="form-group my-2">
                                <label className="fw-bold">Phone Number :</label> {contactDetail.phoneNumber}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <h3>Contact Status :</h3>
                            <div className="form-group my-2">
                                <label className="fw-bold">State :</label>
                                <input type="text" className="form-control bg-light" placeholder={contactDetail.state} disabled />
                            </div>

                            <div className="form-group my-2">
                                <label className="fw-bold">Time Create :</label> {convertDate(contactDetail.timeCreated)}
                            </div>

                            <div className="form-group my-2">
                                <label className="fw-bold">Finished Time :</label> {convertDate(contactDetail.finishedTime)}
                            </div>

                            <div className="form-group my-2">
                                <label className="fw-bold">Last Time Modified :</label> {convertDate(contactDetail.lastTimeModified)}
                            </div>
                        </div>

                    </div>

                    <h3>Content:</h3>
                    <div className="form-group my-2">
                        <textarea className="form-control  bg-light" rows={5} defaultValue={contactDetail.content} disabled />
                    </div>
                    <br />

                    <div className="row my-4">
                        <div className="col-6">
                            <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <button className="btn btn-warning" onClick={() => handleChangeState()}>Change State</button>

                                </div>
                                <div className="col-6">
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => selectState(e.target.value)} defaultValue={0}>
                                        <option value={0}>Pending</option>
                                        <option value={1}>Done</option>
                                        <option value={2}>Ignore</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AdminContactDetail;