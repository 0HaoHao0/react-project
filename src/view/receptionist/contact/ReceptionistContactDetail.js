import moment from "moment/moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateContact } from "../../../services/receptionist/apiReceptionistContact";


function ReceptionistContactDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, stateIndex } = state;

    const [contactUpdate, setContactUpdate] = useState({ id, stateIndex });

    const options = [
        { value: "0", label: "Pending" },
        { value: "1", label: "Done" },
        { value: "2", label: "Ignore" }
    ];

    const formatDate = (dateString) => moment(dateString).format("YYYY-MM-DD");

    const handleSelectChange = (event) => {
        const selectValue = parseInt(event.target.value);

        setContactUpdate(prevContactUpdate => ({
            ...prevContactUpdate,
            stateIndex: selectValue
        }));
    }

    const handleUpdate = async () => {
        Swal.fire({
            title: 'Are You Sure ?',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'OK',
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Xử lý khi người dùng bấm OK
                if (contactUpdate.stateIndex === undefined) {
                    toast.error("You haven't selected the state yet!");
                }
                else {
                    await updateContact(contactUpdate);
                    toast.success("Update Successful!");
                    navigate("/receptionist/contact");
                }
            } else {
                // Xử lý khi người dùng bấm Cancel
                toast.info("Update cancelled");
            }
        });

    }
    return (<>
        <div className="receptionist-contact-detail">
            <div>
                <h1>Contact Detail</h1>
            </div>
            <hr />
            <div className="container">

                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div className="row my-2">
                            <div className="col-3 fw-bold">Id: </div>
                            <div className="col-9 text-left ">
                                <input className="form-control" type="text" value={state.id} readOnly={true} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 fw-bold">Name: </div>
                            <div className="col-9 text-left ">
                                <input className="form-control" type="text" value={state.name} readOnly={true} />
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-3 fw-bold">Email: </div>
                            <div className="col-9 text-left ">
                                <input className="form-control" type="text" value={state.email} readOnly={true} />
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-3 fw-bold">State: </div>
                            <div className="col-9 text-left">
                                <select className='form-select' aria-label="Default select example" onChange={handleSelectChange}>
                                    <option disabled selected>{state.state}</option>
                                    {options.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            hidden={option.label === state.state}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>





                    <div className={`col-lg-6 col-sm-12`}>
                        <div className="row my-2">
                            <div className="col-3 fw-bold">Contect: </div>
                            <div className="col-9">
                                <textarea className="form-control" disabled placeholder={state.content} cols="30" rows="5"></textarea>
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-3 fw-bold">Time Created: </div>
                            <div className="col-9">
                                <div className="input-group">
                                    <input className="form-control" type="date" value={formatDate(state.timeCreated)} readOnly={true} />
                                    <span className="input-group-text">
                                        <i className="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-3 fw-bold">Last Time Modified: </div>
                            <div className="col-9">
                                <div className="input-group">
                                    <input className="form-control" type="date" value={formatDate(state.lastTimeModified)} readOnly={true} />
                                    <span className="input-group-text">
                                        <i className="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-3 fw-bold">Finished Time: </div>
                            <div className="col-9">
                                <div className="input-group">
                                    <input className="form-control" type="date" value={formatDate(state.finishedTime)} readOnly={true} />
                                    <span className="input-group-text">
                                        <i className="fas fa-calendar-alt"></i>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button className="btn btn-primary"
                    onClick={() => { handleUpdate() }}
                > Update</button>
            </div>

        </div>
    </>);
}

export default ReceptionistContactDetail;