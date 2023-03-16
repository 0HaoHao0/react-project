import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setVerifiedEmail(data.email);
  };
  useEffect(() => {
    getData();
  }, []);

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
        newPassword: "The new password cannot be the same as the old password",
        oldPassword: "The new password cannot be the same as the old password",
      }));
    } else if (newPassword !== confirmPassword) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "dont match",
        confirmpassword: "dont match",
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
        confirmPassword: "dont match",
        newPassword: "dont match",
      }));
    } else if (confirmPassword.length < 6) {
      result = false;
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
    let res = await profile(userInfo.id, oldPassword, newPassword);
    if (res.status === 200) {
      toast.success("Submit Successful");
      navigate("/profile");
    }
  };

  const handleSendCodeToEmail = async () => {
    let emailOk = validateVerifiedEmail();
    if (!emailOk) {
      return;
    }
    setChangleStyle(4);
    const res = await SendCodeToEmail(verifiedEmail);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };
  const handleConfirmCodeUser = async (e) => {
    let codeOk = validateInsertCode();
    if (!codeOk) {
      return;
    }
    const res = await VerifyUserByCode(userInfo.id, code);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  return (
    <>
      <div className="profile">
        <div className="navbar-top">
          <div className="title">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-3 col-sm-12">
            <div className="sidenav vh-100">
              <div className="profile-img">
                <img
                  src={userInfo.imageURL}
                  alt="avatar"
                  width="180"
                  height="180"
                  className="profile-imgg"
                />

                <div className="name text-primary text-uppercase">
                  {userInfo.userName}{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </div>
              <div className="sidenav-url mt-5">
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
                <div className="main">
                  <h2>USER INFORMATION</h2>
                  <div className="card">
                    <div className="card-body">
                      <table>
                        <tbody>
                          <tr>
                            <td className="fw-bold fs-">Fullname</td>
                            <td>:</td>
                            <td className="profile-td">{userInfo.fullName}</td>
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
                              {userInfo.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Gender</td>
                            <td>:</td>
                            <td className="profile-td">{userInfo.gender}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold fs-">Birthdate</td>
                            <td>:</td>
                            <td className="profile-td">
                              {convertDate(userInfo.birthDate)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
          ) : changleStyle === 2 ? (
            <>
              <div className="col-lg-9 col-sm-12">
                <div className="main">
                  <h2 className="mt-5">UPDATE PASSWORD</h2>
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
                <div className="main">
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
          ) : (
            <>
              <div className="col-lg-9 col-sm-12">
                <div className="main">
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
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
