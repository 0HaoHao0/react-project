import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/authorization/apILogin";
import {
  profile,
  updateProfile,
} from "../../services/authorization/apIProfile";
//toast
import { toast } from "react-toastify";
import "./Profile.scss";
import {
  SendCodeToEmail,
  VerifyUserByCode,
} from "../../services/authorization/apIRegister";
import Swal from "sweetalert2";
import {
  getPatientInfo,
  updateMedicalRecord,
} from "../../services/admin/patient/apiPatient";
import { getDoctorInfo } from "../../services/admin/doctor/apiDoctor";
import { createUser } from "../../redux/features/userSlide";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../services/admin/user/apiUser";

function Profile() {
  const [changleStyle, setChangleStyle] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dataError, setDataError] = useState("");
  const [isTouched, setIsTouched] = useState({}); // biến cờ
  const [code, setCode] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isUpdatePage, setIsUpdatePage] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    FullName: null,
    BirthDate: null,
    Gender: null,
    Address: null,
    PhoneNumber: null,
  });
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [CodeClickedTime, setCodeClickedTime] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const dispatch = useDispatch();

  const handleUpdateUserInfo = async () => {
    Swal.fire({
      title: "Waiting...",
    });
    Swal.showLoading();
    const res = await updateProfile({
      userId: userInfo.id,
      newInfo: updatedUserInfo,
    });

    if (res.status === 200) {
      toast.success();
      setUserInfo(res.data);
      setIsUpdatePage(false);
      Swal.close();
    } else if (res.status === 400) {
      let errors = res.data;
      let messages = "";
      errors.forEach((item) => {
        messages += item.description + "\n";
      });

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: messages,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {

    const getData = async () => {
      let res = await getUserInfo();
      if (res.status === 200) {
        // Set Userinfo
        let userInfo = res.data;
        dispatch(createUser(userInfo));
        setUserInfo(userInfo);
        setVerifiedEmail(userInfo.email);
      } else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Something went wrong!!");
      }
    };

    getData();
      
  }, [dispatch]);

  //get Patient
  useEffect(() => {
    if (changleStyle === 5) {
      Swal.fire({
        icon: "info",
        title: "Waiting to get data...",
      });
      Swal.showLoading();
      const getPatient = async () => {
        const res = await getPatientInfo(userInfo.id);
        if (res.status === 200) {
          setMedicalRecord(res.data.medicalRecordFile);
        } else if (res.status < 500) {
          toast.error(res.data);
        } else {
          toast.error("Something wrong!");
        }

        Swal.close();
      };
      getPatient();
    }
  }, [changleStyle, userInfo.id]);

  //Update Medical Record Patient
  const handleUpdateMedicalRecord = () => {
    Swal.fire({
      title: "Select a file",
      html: '<input type="file" id="custom-file" className="form-control">',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
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
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();
        // Handle file here
        let formData = new FormData();
        formData.append("Id", userInfo.id);
        formData.append("File", file);
        const res = await updateMedicalRecord(formData);
        Swal.close();
        if (res.status === 200) {
          setMedicalRecord(res.data.medicalRecordFile);
          Swal.fire({
            icon: "success",
            title: "Update Sucessfull!",
          });
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            title: res.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }
      }
    });
  };
  //Get Doctor
  useEffect(() => {
    if (changleStyle === 6) {
      Swal.fire({
        icon: "info",
        title: "Waiting to get data...",
      });
      Swal.showLoading();
      const getDoctor = async () => {
        const res = await getDoctorInfo(userInfo.id);
        if (res.status === 200) {
          setCertificateFile(res.data.certificate);
          console.log(res.data);
        } else if (res.status < 500) {
          toast.error(res.data);
        } else {
          toast.error("Something wrong!");
        }

        Swal.close();
      };
      getDoctor();
    }
  }, [changleStyle, userInfo.id]);

  //Update Avatar
  const hanldeUpdateAvatar = async () => {
    Swal.fire({
      title: "Select a file",
      html: '<input type="file" id="custom-file" className="form-control">',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
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
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();
        // Handle file here
        let formData = new FormData();
        console.log(userInfo);
        formData.append("userId", userInfo.id);
        formData.append("image", file);
        const res = await updateAvatar(formData);
        Swal.close();
        if (res.status === 200) {
          console.log(res.data);
          setUpdateImage(res.data.newImage);
          setUserInfo(res.data.user)
          Swal.fire({
            icon: "success",
            title: "Update Sucessfull!",
          });
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            title: res.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }
      }
    });
  };

  //validate new password
  const validateOldPassWord = () => {
    let result = true;
    setIsTouched((prevState) => ({
      ...prevState,
      oldPassword: "Touch",
    }));

    if (oldPassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        oldPassword: "Password cannot be empty!",
      }));
    } else if (oldPassword.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        oldPassword: "Password must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        oldPassword: "",
      }));
    }
    return result;
  };
  //validate new password
  const validateNewPassWord = () => {
    let result = true;
    setIsTouched((prevState) => ({
      ...prevState,
      newPassword: "Touch",
    }));

    if (newPassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "Password cannot be empty!",
      }));
    } else if (newPassword === oldPassword) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "The new password cannot be the same as the old password.",
      }));
    } else if (newPassword.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "Password must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "",
      }));
    }
    return result;
  };
  //validate confirm password
  const validateConfirmPassWord = () => {
    let result = true;
    setIsTouched((prevState) => ({
      ...prevState,
      confirmPassword: "Touch",
    }));
    if (confirmPassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Password cannot be empty!",
      }));
    } else if (confirmPassword !== newPassword) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "The confirm password is not exactly.",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }
    return result;
  };
  // validateVerifiedEmail
  const validateVerifiedEmail = (e) => {
    let result = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsTouched((prevState) => ({
      ...prevState,
      verifiedEmail: "is-invalid",
    }));
    // let verifiedEmail = e.target.value;
    if (verifiedEmail.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "Email cannot be empty!",
      }));
    } else if (!emailRegex.test(verifiedEmail)) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "Invalid email format!",
      }));
    } else {
      setIsTouched((prevState) => ({
        ...prevState,
        verifiedEmail: "is-valid",
      }));
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "",
      }));
    }
    return result;
  };
  // validateInsertCode
  const validateInsertCode = () => {
    let result = true;
    setIsTouched((prevState) => ({
      ...prevState,
      code: "Touch",
    }));
    if (code.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        code: "Code cannot be empty!",
      }));
    } else if (code.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        code: "code must be at least 6 characters long",
      }));
    } else if (code.length > 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        code: "code cannot be more than 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        code: "",
      }));
    }
    return result;
  };

  //Convert Date
  const convertDate = (obj) => {
    if (obj == null) {
      return null;
    } else {
      let date = obj.split("T")[0];
      return date;
    }
  };

  const handleSubmitAccount = async (e) => {
    let passOk =
      validateOldPassWord() &&
      validateNewPassWord() &&
      validateConfirmPassWord();
    if (!passOk) {
      return;
    }

    Swal.fire({
      title: "Waiting for response...",
    });
    Swal.showLoading();
    let res = await profile(userInfo.id, oldPassword, newPassword);
    if (res.status === 200) {
      let message = res.data;
      toast.success(message);
      Swal.close();
    } else if (res.status === 400) {
      let errors = res.data;
      let messages = "";
      errors.forEach((item) => {
        messages += item.description + "\n";
      });

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: messages,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };

  const handleSendCodeToEmail = async (e) => {
    let canClick =
      CodeClickedTime === null ||
      new Date().getTime() - CodeClickedTime > 15000;
    if (canClick) {
      setCodeClickedTime(new Date().getTime());
    } else {
      let diff =
        15 - Math.floor((new Date().getTime() - CodeClickedTime) / 1000);
      toast.warning("Waiting in " + diff + "s");
      return;
    }

    let emailOk = validateVerifiedEmail();
    if (!emailOk) {
      return;
    }

    const res = await SendCodeToEmail(verifiedEmail);
    if (res.status === 200) {
      setUserInfo({
        ...userInfo,
        email: verifiedEmail,
      });
      setChangleStyle(4);
      console.log("Sending success");
    } else if (res.status === 400) {
      Swal.fire({
        icon: "error",
        title: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something error!",
      });
    }
  };

  const handleConfirmCodeUser = async (e) => {
    let canClick =
      CodeClickedTime === null ||
      new Date().getTime() - CodeClickedTime > 15000;
    if (canClick) {
      setCodeClickedTime(new Date().getTime());
    } else {
      let diff =
        15 - Math.floor((new Date().getTime() - CodeClickedTime) / 1000);
      toast.warning("Waiting in " + diff + "s");
      return;
    }

    let codeOk = validateInsertCode();
    if (!codeOk) {
      return;
    }
    const res = await VerifyUserByCode(userInfo.id, code);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Email Verify Successfully",
      });
    } else if (res.status === 400) {
      Swal.fire({
        icon: "error",
        title: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something error!",
      });
    }
  };

  return (
    <>
      <div className="profile">
        <div className="row">
          <div className="col col-lg-3 col-sm-12">
            <div className="sidenav vh-100">
              <div className="profile-img">
                <img
                  src={userInfo.imageURL}
                  alt="avatar"
                  width="200"
                  height="200"
                  value={updateImage}
                  className="profile-imgg"
                />
                <div className="name text-primary text-uppercase">
                  {userInfo.fullName}{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </div>
              {/* Update Avatar */}
              <div className="sidenav-url mt-5">
                <div className="url">
                  <button className="btn btn-success w-50" onClick={hanldeUpdateAvatar}>
                    Update Avatar
                    <i class="fa-solid fa-camera profile-icon"></i>
                  </button>
                  <hr align="center" />
                </div>
                <div className="url">
                  <button
                    type="button"
                    className={
                      "btn btn" +
                      (changleStyle !== 1 ? "-outline" : "") +
                      "-primary w-50 text-center"
                    }
                    onClick={() => {
                      setChangleStyle(1);
                    }}
                  >
                    UserInfo
                    <i className="fa-solid fa-user icon-change profile-icon"></i>
                  </button>
                  <hr align="center" />
                </div>
                <div className="url">
                  <button
                    type="button"
                    className={
                      "btn btn" +
                      (changleStyle !== 2 ? "-outline" : "") +
                      "-primary w-50 profile-button text-center"
                    }
                    onClick={() => {
                      setChangleStyle(2);
                    }}
                  >
                    Update Password
                    <i className="fa-solid fa-lock profile-icon"></i>
                  </button>
                  <hr align="center" />
                </div>
                {userInfo.role === "Patient" ? (
                  <div className="url">
                    <button
                      type="button"
                      className={
                        "btn btn" +
                        (changleStyle !== 5 ? "-outline" : "") +
                        "-primary w-50 profile-button text-center"
                      }
                      onClick={() => {
                        setChangleStyle(5);
                      }}
                    >
                      Medical Record
                      <i class="fa-solid fa-notes-medical profile-icon"></i>
                    </button>
                    <hr align="center" />
                  </div>
                ) : userInfo.role === "Doctor" ? (
                  <>
                    <div className="url">
                      <button
                        type="button"
                        className={
                          "btn btn" +
                          (changleStyle !== 6 ? "-outline" : "") +
                          "-primary w-50 profile-button text-center"
                        }
                        onClick={() => {
                          setChangleStyle(6);
                        }}
                      >
                        Certificate File
                        <i className="fa-solid fa-lock profile-icon"></i>
                      </button>
                      <hr align="center" />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="url">
                  <button
                    type="button"
                    className="btn btn-danger w-50 profile-button text-center"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                    <i className="fa-solid fa-backward profile-icon"></i>
                  </button>
                  <hr align="center" />
                </div>
              </div>
            </div>
          </div>
          {changleStyle === 1 ? (
            <>
              <div className="col col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "5%" }}>
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="pt-4">USER INFORMATION</h2>
                    <button
                      className="ml-3 mt-3 btn btn-success"
                      onClick={(e) => {
                        console.log("Clicked Edit...");
                        setIsUpdatePage(true);
                      }}
                    >
                      Update User
                      <i className="fa-solid fa-user-pen profile-update-user"></i>
                    </button>
                  </div>
                  <hr />
                  <div className="card">
                    <div className="card-body">
                      <table>
                        <tbody>
                          <tr>
                            <td className="fw-bold fs-">Fullname</td>
                            <td>:</td>
                            <td className="profile-td">
                              {isUpdatePage ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={userInfo.fullName}
                                  onChange={(e) => {
                                    setUpdatedUserInfo({
                                      ...updatedUserInfo,
                                      FullName: e.target.value,
                                    });
                                  }}
                                />
                              ) : (
                                userInfo.fullName
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Username</td>
                            <td>:</td>
                            <td className="profile-td">{userInfo.userName}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Email</td>
                            <td>:</td>
                            <td className="profile-td">{userInfo.email}</td>
                            {!userInfo.emailConfirmed ? (
                              userInfo.emailConfirmed === false ? (
                                <td>
                                  <button
                                    className="btn btn-warning fw-bold px-4 unconfrim"
                                    onClick={() => {
                                      setChangleStyle(3);
                                    }}
                                  >
                                    Unconfirmed
                                  </button>
                                </td>
                              ) : null
                            ) : (
                              <td className="text-primary fw-bolder">
                                Verified
                                <i className="fa-solid fa-circle-check px-3"></i>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Phone</td>
                            <td>:</td>
                            <td className="profile-td">
                              {isUpdatePage ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={userInfo.phoneNumber}
                                  onChange={(e) => {
                                    setUpdatedUserInfo({
                                      ...updatedUserInfo,
                                      PhoneNumber: e.target.value,
                                    });
                                  }}
                                />
                              ) : (
                                userInfo.phoneNumber
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Gender</td>
                            <td>:</td>
                            <td className="profile-td">
                              {isUpdatePage ? (
                                <select
                                  className="form-control"
                                  defaultValue={userInfo.gender}
                                  onChange={(e) => {
                                    setUpdatedUserInfo({
                                      ...updatedUserInfo,
                                      Gender: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              ) : (
                                userInfo.gender
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Birthdate</td>
                            <td>:</td>
                            <td className="profile-td">
                              {isUpdatePage ? (
                                <input
                                  type="date"
                                  className="form-control"
                                  defaultValue={convertDate(userInfo.birthDate)}
                                  onChange={(e) => {
                                    setUpdatedUserInfo({
                                      ...updatedUserInfo,
                                      BirthDate: convertDate(e.target.value),
                                    });
                                  }}
                                />
                              ) : (
                                new Date(
                                  userInfo.birthDate
                                ).toLocaleDateString()
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Address</td>
                            <td>:</td>
                            <td className="profile-td">
                              {isUpdatePage ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={userInfo.address}
                                  onChange={(e) => {
                                    setUpdatedUserInfo({
                                      ...updatedUserInfo,
                                      Address: e.target.value,
                                    });
                                  }}
                                />
                              ) : (
                                userInfo.address
                              )}
                            </td>
                          </tr>
                          {isUpdatePage && (
                            <tr className="text-end">
                              <td></td>
                              <td></td>
                              <td className="">
                                <button
                                  className="btn btn-danger mx-2"
                                  onClick={(e) => setIsUpdatePage(false)}
                                >
                                  <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={handleUpdateUserInfo}
                                >
                                  Submit
                                </button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </>
          ) : changleStyle === 2 ? (
            <>
              <div className="col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "10%" }}>
                  <h2 className="main-h2">UPDATE PASSWORD</h2>
                  <hr />
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <label className="mb-0 fw-bolder profile-h5">
                            Old Password
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            className={`text-muted mb-0 class-input form-control profile-input ${
                              isTouched.oldPassword &&
                              (dataError.oldPassword
                                ? "is-invalid"
                                : "is-valid")
                            }`}
                            onBlur={validateOldPassWord}
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                            }}
                          />
                          {dataError.oldPassword ? (
                            <p className="invalid-feedback">
                              {dataError.oldPassword}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {/* New password */}
                      <div className="row mt-1">
                        <div className="col-sm-3">
                          <label className="mb-0 fw-bolder profile-h5">
                            New Password
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            className={`text-muted mb-0 class-input form-control profile-input ${
                              isTouched.newPassword &&
                              (dataError.newPassword
                                ? "is-invalid"
                                : "is-valid")
                            }`}
                            onBlur={validateNewPassWord}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                          />
                          {dataError.newPassword ? (
                            <p className="invalid-feedback">
                              {dataError.newPassword}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {/* confirm password */}
                      <div className="row mt-1">
                        <div className="col-sm-3">
                          <label className="mb-0 fw-bolder profile-h5">
                            Confirm Password
                          </label>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            onBlur={validateConfirmPassWord}
                            className={`text-muted mb-0 class-input form-control profile-input ${
                              isTouched.confirmPassword &&
                              (dataError.confirmPassword
                                ? "is-invalid"
                                : "is-valid")
                            }`}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                          />
                          {dataError.confirmPassword ? (
                            <p className="invalid-feedback">
                              {dataError.confirmPassword}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                          <input
                            type="submit"
                            className="btn btn-primary profile-submit w-25"
                            onClick={(e) => handleSubmitAccount(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2>SOCIAL MEDIA</h2>
                  <div className="card">
                    <div className="card-body">
                      <div className="social-media">
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : changleStyle === 3 ? (
            <>
              <div className="col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "10%" }}>
                  <h2 className="mt-5">INSERT EMAIL ACCOUNT</h2>
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <label
                          className="profile-label-insertemail"
                          htmlFor="inputEmail"
                        >
                          Email
                        </label>
                        <div className="input-group">
                          <input
                            type="email"
                            className={`form-control ${isTouched.verifiedEmail}`}
                            id="inputEmail"
                            onBlur={validateVerifiedEmail}
                            defaultValue={userInfo.email}
                            onChange={(e) => {
                              setVerifiedEmail(e.target.value);
                            }}
                            required
                          />
                          {dataError.verifiedEmail ? (
                            <p className="invalid-feedback">
                              {dataError.verifiedEmail}
                            </p>
                          ) : null}
                        </div>
                        <div className="invalid-feedback">
                          Please provide a valid email address.
                        </div>
                      </div>

                      <div className="input-field">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Submit"
                          onClick={(e) => {
                            handleSendCodeToEmail(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <h2>SOCIAL MEDIA</h2>
                  <div className="card">
                    <div className="card-body">
                      <div className="social-media">
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : changleStyle === 4 ? (
            <>
              <div className="col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "10%" }}>
                  <h2 className="mt-5">EMAIL ACCOUNT CONFIRMATION</h2>
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <label
                          className="profile-label-insertemail"
                          htmlFor="inputEmail"
                        >
                          Code
                        </label>
                        <div className="input-group">
                          <input
                            type="email"
                            className={`form-control text-center ${
                              isTouched.code &&
                              (dataError.code ? "is-invalid" : "is-valid")
                            }`}
                            id="inputEmail"
                            onBlur={validateInsertCode}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                          />
                          {dataError.code ? (
                            <p className="invalid-feedback">{dataError.code}</p>
                          ) : null}
                        </div>
                        <div className="invalid-feedback">
                          Please provide a valid email address.
                        </div>
                      </div>

                      <div className="input-field">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Confirm"
                          onClick={() => {
                            handleConfirmCodeUser();
                          }}
                        />
                        <input
                          type="submit"
                          className="btn btn-primary mx-2"
                          value="Resend"
                          onClick={() => {
                            handleSendCodeToEmail();
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <h2>SOCIAL MEDIA</h2>
                  <div className="card">
                    <div className="card-body">
                      <div className="social-media">
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                        </span>
                        <span className="fa-stack fa-sm">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : changleStyle === 5 ? (
            <>
              <div className="col col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "10%" }}>
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="pt-4">MEDICAL RECORD INFORMATION</h2>
                  </div>
                  <hr />
                  <div className="card">
                    <div className="card-body">
                      {medicalRecord && (
                        <div className="">
                          <div className="row">
                            <span className="col-4 text-left">Uploaded At</span>
                            <span className="col-1">:</span>
                            <span className="text-mute col-7">
                              {new Date(medicalRecord.lastTimeModified).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className="row">
                            <span className="col-4 text-left">File</span>
                            <span className="col-1">:</span>
                            <span className="col-7">
                              {medicalRecord.fileURL && (
                                <Link
                                  to={medicalRecord.fileURL}
                                  className="btn btn-primary"
                                  target="_blank"
                                >
                                    View Details
                                </Link>
                              )}
                              <button
                                onClick={handleUpdateMedicalRecord}
                                className="btn btn-success mx-2"
                              >
                                Upload
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col col-lg-9 col-sm-12">
                <div className="main" style={{ marginTop: "10%" }}>
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="pt-4">CERTIFICATE FILE INFORMATION</h2>
                  </div>
                  <hr />
                  <div className="card py-4">
                    <div className="card-body">
                      {certificateFile && (
                        <div className="">
                          <div className="row">
                            <span className="col-4 text-left">Uploaded At</span>
                            <span className="col">:</span>
                            <i className="col-7">
                              {new Date(
                                certificateFile.lastTimeModified
                              ).toLocaleString()}
                            </i>
                          </div>
                          <div className="row">
                            <span className="col-4 text-left">
                              Certificate File
                            </span>
                            <span className="col">:</span>
                            <span className="col-7">
                              {certificateFile.fileURL && (
                                <Link
                                  to={certificateFile.fileURL}
                                  className="btn btn-primary"
                                  target="_blank"
                                >
                                  View Details
                                </Link>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
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

export default Profile;
