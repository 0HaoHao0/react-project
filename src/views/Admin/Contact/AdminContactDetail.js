import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContactGetId } from "../../../services/AdminApiConnection/adminContactApi";

function AdminContactDetail() {
    const param = useParams();

    const [contactDetail, setContactDetail] = useState([]);

    useEffect(() => {
        const getContactId = async () => {
            let response = await ContactGetId(param.id);

            setContactDetail(response.data)
        }
        getContactId();
    }, [param.id]);


    const convertDate = (obj) => {
        if (obj == null) {
            return null;
        }
        else {
            let date = new Date(obj).toISOString().split('T')[0]

            return date;
        }
    }
    return (<>
        <div className="admin-contact-detail">
            <div className="card-admin card m-4 ">
                <h5 className="m-5 p-2 fw-bold border border-dark bg-light">
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
                            <button className="btn btn-danger">Back</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-warning">Change State</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AdminContactDetail;