import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PatientGetinfo.scss";
function PatientGetinfo() {
  const [patientStyle, setPatientStyle] = useState(1);
  let { state } = useLocation();
  console.log(state.value);

  //Convert Date
  const convertDate = (obj) => {
    if (obj == null) {
      return null;
    } else {
      let date = obj.split("T")[0];

      return date;
    }
  };
  return (
    <>
      <div className="patient-getinfo">
        <div>
          <h1>Patient Profile</h1>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-3 col-sm-12 form-left">
            <button
              className="btn btn-primary w-100 p-2 mt-2 rounded"
              onClick={() => {
                setPatientStyle(1);
              }}
            >
              baseUser
              <i class="fa-solid fa-address-card"></i>
            </button>
            <button
              className="btn btn-primary w-100 p-2 mt-2 rounded"
              onClick={() => {
                setPatientStyle(2);
              }}
            >
              medicalRecordFile
              <i class="fa-solid fa-table"></i>
            </button>
          </div>
          {patientStyle === 1 ? (
            <>
              <div className="col-lg-9 col-sm-12 form-right">
                <div className="form-group my-3 d-flex">
                  <img
                    src={state.value.baseUser.imageURL}
                    width="20%"
                    alt=""
                    className="img-avatar"
                  />
                  <label className="fw-bold label-avatar">
                    {" "}
                    Welcome,{" "}
                    <span className="span-avatar">
                      {state.value.baseUser.userName}
                    </span>{" "}
                  </label>{" "}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group my-3 row ">
                      <label className="fw-bold col-4"> User Name :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.userName}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Full Name :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.fullName}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Email :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.email}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Phone Number :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Birth Date :</label>{" "}
                      <div className="col-8 text-left">
                        <span>
                          {convertDate(state.value.baseUser.birthDate)}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Gender :</label>
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.gender}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Address :</label>
                      <div className="col-8 text-left">
                        <span className="text-span">
                          {state.value.baseUser.address}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Role :</label>
                      <div className="col-8 text-left">
                        <span>{state.value.baseUser.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            //   changeMedical
            <>
              <div className="col-lg-9 col-sm-12 form-right">
                <div className="form-group my-3 d-flex">
                  <label className="fw-bold label-avatar-2">
                    {" "}
                    Welcome,{" "}
                    <span className="span-avatar">
                      {state.value.baseUser.userName}
                    </span>{" "}
                  </label>{" "}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group my-3 row ">
                      <label className="fw-bold col-4"> Category :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.medicalRecordFile.category}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> File URL :</label>{" "}
                      <div className="col-8 text-left">
                        <a
                          href={state.value.medicalRecordFile.fileURL}
                          rel="noreferrer"
                          target="_Blank"
                          className="btn btn-primary"
                        >
                          View
                        </a>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> ID :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{state.value.medicalRecordFile.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4">
                        {" "}
                        Last Time Modified :
                      </label>{" "}
                      <div className="col-8 text-left">
                        <span>
                          {convertDate(
                            state.value.medicalRecordFile.lastTimeModified
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Time Created :</label>
                      <div className="col-8 text-left">
                        <span>
                          {convertDate(
                            state.value.medicalRecordFile.timeCreated
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button className="btn btn-primary mt-5">Update</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientGetinfo;
