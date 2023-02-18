import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateMedicalRecord } from "../../../services/admin/patient/apiPatient";
import "./PatientGetinfo.scss";
function PatientGetInfo() {
  const [patientStyle, setPatientStyle] = useState(1);
  let { state } = useLocation();

  const [patientInfo, setPatientInfo] = useState(state);
  const [isLoading, setIsLoading] = useState(false);


  //Convert Date
  const convertDate = (obj) => {
    if (obj == null) {
      return null;
    } else {
      let date = obj.split("T")[0];

      return date;
    }
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "Select a file",
      html: '<input type="file" id="custom-file" className="form-control">',
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      focusConfirm: false,
      preConfirm: () => {
        const file = document.getElementById("custom-file").files[0];
        if (!file) {
          Swal.showValidationMessage("You need to choose a file");
        }
        return { file: file };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const file = result.value.file;
        // Handle file here
        let formData = new FormData();
        formData.append("Id", state.id);
        formData.append("File", file);
        setIsLoading(true);
        const res = await updateMedicalRecord(formData);
        setPatientInfo(res.data);
        setIsLoading(false);

        toast.success("Update Successful !");
      }
    });
  };
  return (
    <>
      <div className="patient-getinfo">
        <div>
          <h1>Patient Profile</h1>
        </div>
        {isLoading && <div className="alert alert-warning">Please wait while we update your medical record...</div>}
        <hr />
        <div className="row">
          <div className="col-lg-3 col-sm-12 form-left">
            <button
              className="btn btn-primary w-100 p-2 mt-2 rounded text-left"
              onClick={() => {
                setPatientStyle(1);
              }}
            >
              <i className="fa-solid fa-address-card me-2"></i>
              Patient Information
            </button>
            <button
              className="btn btn-primary w-100 p-2 mt-2 rounded text-left"
              onClick={() => {
                setPatientStyle(2);
              }}
            >
              <i className="fa-solid fa-table me-2"></i>
              Medical Record
            </button>
          </div>
          {patientStyle === 1 ? (
            <>
              <div className="col-lg-9 col-sm-12 form-right">
                <div className="form-group my-3 d-flex">
                  <img
                    src={patientInfo.baseUser.imageURL}
                    width="20%"
                    alt=""
                    className="img-avatar"
                  />
                  <label className="fw-bold label-avatar">
                    {" "}
                    Welcome,{" "}
                    <span className="span-avatar">
                      {patientInfo.baseUser.userName}
                    </span>{" "}
                  </label>{" "}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group my-3 row ">
                      <label className="fw-bold col-4"> User Name :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.userName}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Full Name :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.fullName}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Email :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.email}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Phone Number :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Birth Date :</label>{" "}
                      <div className="col-8 text-left">
                        <span>
                          {convertDate(patientInfo.baseUser.birthDate)}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Gender :</label>
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.gender}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Address :</label>
                      <div className="col-8 text-left">
                        <span className="text-span">
                          {patientInfo.baseUser.address}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Role :</label>
                      <div className="col-8 text-left">
                        <span>{patientInfo.baseUser.role}</span>
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
                      {patientInfo.baseUser.userName}
                    </span>{" "}
                  </label>{" "}
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> ID :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.medicalRecordFile.id}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row ">
                      <label className="fw-bold col-4"> Category :</label>{" "}
                      <div className="col-8 text-left">
                        <span>{patientInfo.medicalRecordFile.category}</span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> File URL :</label>{" "}
                      <div className="col-8 text-left">
                        <a
                          href={patientInfo.medicalRecordFile.fileURL}
                          rel="noreferrer"
                          target="_Blank"
                          className="btn btn-primary"
                        >
                          View
                        </a>
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
                            patientInfo.medicalRecordFile.lastTimeModified
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="form-group my-3 row">
                      <label className="fw-bold col-4"> Time Created :</label>
                      <div className="col-8 text-left">
                        <span>
                          {convertDate(
                            patientInfo.medicalRecordFile.timeCreated
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate()}
                    >
                      Update File
                    </button>
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

export default PatientGetInfo;
