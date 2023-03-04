import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/authorization/apILogin";
import { profile } from "../../services/authorization/apIProfile";
//toast
import { toast } from "react-toastify";
import "./Profile.scss";
import {
  SendCodeToEmail,
  VerifyUserByCode,
} from "../../services/authorization/apIRegister";

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

  const navigate = useNavigate();

  const getData = async () => {
    let data = (await getUserInfo()).data;
    console.log(data);
    setUserInfo(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //validate new password
  const validateOldPassWord = () => {
    setIsTouched((prevState) => ({
      ...prevState,
      oldPassword: "Touch",
    }));

    if (oldPassword.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        oldPassword: "Password cannot be empty!",
      }));
    } else if (oldPassword.length < 6) {
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
  };
  //validate new password
  const validateNewPassWord = () => {
    setIsTouched((prevState) => ({
      ...prevState,
      newPassword: "Touch",
    }));

    if (newPassword.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "Password cannot be empty!",
      }));
    } else if (newPassword === oldPassword) {
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "The new password cannot be the same as the old password",
        oldPassword: "The new password cannot be the same as the old password",
      }));
    } else if (newPassword !== confirmPassword) {
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "dont match",
        confirmpassword: "dont match",
      }));
    } else if (newPassword.length < 6) {
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
  };
  //validate confirm password
  const validateConfirmPassWord = () => {
    setIsTouched((prevState) => ({
      ...prevState,
      confirmPassword: "Touch",
    }));
    if (confirmPassword.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Password cannot be empty!",
      }));
    } else if (confirmPassword !== newPassword) {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "dont match",
        newPassword: "dont match",
      }));
    } else if (confirmPassword.length < 6) {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Password must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }
  };
  // validateVerifiedEmail
  const validateVerifiedEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsTouched((prevState) => ({
      ...prevState,
      verifiedEmail: "is-invalid",
    }));
    let verifiedEmail = e.target.value;
    if (verifiedEmail.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "Email cannot be empty!",
      }));
    } else if (!emailRegex.test(verifiedEmail)) {
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
  };
  // validateInsertCode
  const validateInsertCode = () => {
    setIsTouched((prevState) => ({
      ...prevState,
      code: "Touch",
    }));
    if (code.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        code: "Code cannot be empty!",
      }));
    } else if (code.length < 6) {
      setDataError((prevState) => ({
        ...prevState,
        code: "code must be at least 6 characters long",
      }));
    } else if (code.length > 6) {
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
  };

  const handleSubmitAccount = async (e) => {
    validateOldPassWord();
    validateNewPassWord();
    validateConfirmPassWord();
    let res = await profile(userInfo.id, oldPassword, newPassword);
    if (res.status === 200) {
      console.log("thanh cong");
      toast.success("Submit Successful");
      navigate("/profile");
    }
  };

  const handleSendCodeToEmail = async () => {
    setChangleStyle(4);
    const res = await SendCodeToEmail(verifiedEmail);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };
  const handleConfirmCodeUser = async (e) => {
    validateInsertCode();
    const res = await VerifyUserByCode(userInfo.id, code);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  return (
    <>
      <div className="profile">
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">
            <div className="row"></div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center profile-left">
                    <img
                      src={userInfo.imageURL}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "170px" }}
                    />
                    <h2 className="fw-bolder profile-role">
                      <span className="p-2">{userInfo.userName}</span>
                      <i className="fa-solid fa-circle-check"></i>
                    </h2>
                    <div className="d-flex justify-content-center" style={{ gap: "10px" }}>
                      <button
                        type="button"
                        className={"btn btn" + (changleStyle !== 1 ? "-outline" : "") + "-primary w-100 profile-button"}
                        onClick={() => {
                          setChangleStyle(1);
                        }}
                      >
                        <i className="fa-solid fa-user icon-change"></i>
                      </button>
                      <button
                        type="button"
                        className={"btn btn" + (changleStyle !== 2 ? "-outline" : "") + "-primary w-100 profile-button"}
                        onClick={() => {
                          setChangleStyle(2);
                        }}
                      >
                      Update Password
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i className="fas fa-globe fa-lg text-warning"></i>
                        <Link
                          className="mb-0 fw-bolder"
                          onClick={() => {
                            setChangleStyle(3);
                          }}
                        >
                          Email
                        </Link>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-github fa-lg"
                          style={{ color: "#333333" }}
                        ></i>
                        <p className="mb-0 fw-bolder">A Chảy</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0 fw-bolder">A Chảy</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-instagram fa-lg"
                          style={{ color: "#ac2bac" }}
                        ></i>
                        <p className="mb-0 fw-bolder">A Chảy</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-facebook-f fa-lg"
                          style={{ color: "#3b5998" }}
                        ></i>
                        <p className="mb-0 fw-bolder">A Chảy</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-facebook-f fa-lg"
                          style={{ color: "#3b5998" }}
                        ></i>
                        <p className="mb-0 fw-bolder">A Chảy</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {changleStyle === 1 ? (
              <>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body profile-right">
                    <div className="row">
                      <div className="col-sm-3 mt-1">
                        <p className="mb-0 fw-bolder">FullName</p>
                      </div>
                      <div className="col-sm-9 mt-1">
                        <p className="text-muted mb-0 fw-bolder">
                          {userInfo.fullName}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="row">
                      <div className="col-sm-3 mt-1">
                        <p className="mb-0 fw-bolder ">UserName</p>
                      </div>
                      <div className="col-sm-9 mt-1">
                        <p className="text-muted mb-0 fw-bolder ">
                          {userInfo.userName}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="row">
                      <div className="col-sm-3 mt-1">
                        <p className="mb-0 fw-bolder">Email</p>
                      </div>
                      <div className="col-sm-9 mt-1 d-flex justify-content-between">
                        <p className="text-muted mb-0 fw-bolder">
                          {userInfo.email}
                        </p>
                        {!userInfo.emailConfirmed ? (
                          userInfo.emailConfirmed === false ? (
                            <button
                              className="btn btn-primary px-4"
                              onClick={() => {
                                setChangleStyle(3);
                              }}
                            >
                              Unconfirmed
                            </button>
                          ) : null
                        ) : (
                          <p className="text-primary fw-bolder">
                            Verified
                            <i className="fa-solid fa-circle-check px-3"></i>
                          </p>
                        )}
                      </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="row">
                      <div className="col-sm-3 mt-2">
                        <p className="mb-0 fw-bolder">Phone</p>
                      </div>
                      <div className="col-sm-9 mt-2">
                        <p className="text-muted mb-0 fw-bolder">
                          {userInfo.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="row">
                      <div className="col-sm-3 mt-1">
                        <p className="mb-0 fw-bolder">Gender</p>
                      </div>
                      <div className="col-sm-9 mt-1">
                        <p className="text-muted mb-0 fw-bolder">
                          {userInfo.gender}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-3" />
                    <div className="row">
                      <div className="col-sm-3 mt-2">
                        <p className="mb-0 fw-bolder">BirthDate</p>
                      </div>
                      <div className="col-sm-9 mt-2">
                        <p className="text-muted mb-0 fw-bolder">
                          {userInfo.birthDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            assigment
                          </span>{" "}
                          Project Status
                        </p>
                        <p className="mb-1" style={{ fontSize: ".77rem" }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "72%" }}
                            aria-valuenow="72"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "89%" }}
                            aria-valuenow="89"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "55%" }}
                            aria-valuenow="55"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "66%" }}
                            aria-valuenow="66"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            assigment
                          </span>{" "}
                          Project Status
                        </p>
                        <p className="mb-1" style={{ fontSize: ".77rem" }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "72%" }}
                            aria-valuenow="72"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "89%" }}
                            aria-valuenow="89"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "55%" }}
                            aria-valuenow="55"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "66%" }}
                            aria-valuenow="66"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
              ) : changleStyle === 2 ? (
                <>
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body profile-right">
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
                        <div className="row">
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
                        <div className="row">
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
                  </div>
                </>
              ) : changleStyle === 3 ? (
                <>
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body profile-right">
                        <div className="input-box">
                          <header className="header-2 h4 text-center fw-bolder">
                            Insert Email account
                          </header>
                          {/* Code */}
                          <div className="form-group mt-5">
                            <label htmlFor="inputEmail">Email</label>
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body profile-right">
                        <div className="input-box">
                          <header className="header-2 h4 text-center fw-bolder">
                            Email account confirmation
                          </header>
                          {/* Code */}
                          <div className="form-group mt-5">
                            <label htmlFor="inputEmail">Code</label>
                            <div>
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
                                <p className="invalid-feedback">
                                  {dataError.code}
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
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
