import moment from "moment/moment";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ContactGetId } from "../../../services/AdminApiConnection/AdminContactApi";

function AdminContactDetail() {
    const param = useParams();

    const [contactDetail, setContactDetail] = useState([]);

    useEffect(() => {
        const getContactId = async () => {
            let response = await ContactGetId(param.id);

            setContactDetail(response.data)
        }
        getContactId();
        console.log(contactDetail);
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
                    <div className="form-group my-2">
                        <label className="fw-bold">Email :</label>
                        <input type="text" className="form-control bg-light" placeholder={contactDetail.email} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Name :</label>
                        <input type="text" className="form-control  bg-light" placeholder={contactDetail.name} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Phone Number :</label>
                        <input type="text" className="form-control  bg-light" placeholder={contactDetail.phoneNumber} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Content :</label>
                        <textarea className="form-control  bg-light" rows={5} defaultValue={contactDetail.content} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">State :</label>
                        <input type="text" className="form-control bg-light" placeholder={contactDetail.state} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Time Create :</label>
                        <input type="date" id="timeCreated" className="form-control  bg-light" value={convertDate(contactDetail.timeCreated)} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Finished Time :</label>
                        <input type="date" id="finishedTime" className="form-control  bg-light" value={convertDate(contactDetail.finishedTime)} disabled />
                    </div>

                    <div className="form-group my-2">
                        <label className="fw-bold">Last Time Modified :</label>
                        <input type="date" id="lastTimeModified" className="form-control  bg-light" value={convertDate(contactDetail.lastTimeModified)} disabled />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default AdminContactDetail;