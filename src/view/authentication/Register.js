import "./Register.scss";
import logo from "../../assets/images/logo/Logo-lg.png";
//Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
//toast
import { toast } from "react-toastify";
//Router
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  register,
  SendCodeToEmail,
  VerifyUserByCode,
} from "../../services/authorization/apIRegister";
import axios from "axios";
function Register() {
  const [userData, setUserData] = useState({
    userName: "",
    fullName: "",
    password: "",
    confirmpassword: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [userId, setUserId] = useState();
  const [code, setCode] = useState("");
  const [changeConfirmRegister, setChangeConfirmRegister] = useState(1);

  const [dataError, setDataError] = useState("");
  const dataRef = useRef();
  const [CodeClickedTime, setCodeClickedTime] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (dataRef.current) {
      dataRef.current.focus();
    }
  }, []);
  //Validate Username
  const validateUserName = () => {
    let result = true;
    if (userData.userName.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        userName: "Username cannot be empty!",
      }));
    } else if (userData.userName.length <= 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        userName: "Username cannot must be least 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        userName: "",
      }));
    }
    return result;
  };
  //Validate Fullname
  const validateFullName = () => {
    let result = true;
    if (userData.fullName.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        fullName: "Fullname cannot be empty!",
      }));
    } else if (userData.fullName.length <= 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        fullName: "Fullname cannot must be least 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        fullName: "",
      }));
    }
    return result;
  };
  //Validate Password
  const validatePassWord = () => {
    let result = true;
    if (userData.password.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        password: "Password cannot be empty!",
      }));
    } else if (userData.password.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        password: "Password must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        password: "",
      }));
    }
    return result;
  };
  // Validate ConfirmPassword
  const validateConfirmPassWord = () => {
    let result = true;
    if (userData.confirmpassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmpassword: "password cannot be empty!",
      }));
    } else if (userData.password !== userData.confirmpassword) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmpassword: "The confirm password is not exactly",
      }));
    } else if (userData.password.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmpassword: "ConfirmPassword must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        confirmpassword: "",
      }));
    }
    return result;
  };
  //Validate Email
  const validateEmail = () => {
    let result = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        email: "Email cannot be empty!",
      }));
    } else if (!emailRegex.test(userData.email)) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        email: "Invalid email format!",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    return result;
  };

  //Validate Phone
  const validatePhone = () => {
    let result = true;
    if (userData.phoneNumber.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        phoneNumber: "Phone cannot be empty!",
      }));
    } else if (isNaN(userData.phoneNumber)) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        contactPhone: "Phone must be a number",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        phoneNumber: "",
      }));
    }
    return result;
  };
  //Validate Gender
  const validateGender = () => {
    let result = true;
    if (userData.gender.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        gender: "Gender cannot be empty!",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        gender: "",
      }));
    }
    return result;
  };

  //validate Code
  const validateInsertCode = () => {
    let result = true;
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

  const handlePhone = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      phoneNumber: e,
    }));
    console.log(e);
  };

  //Submit
  const handleSubmit = async (e) => {
    let userOk =
      validateUserName() &&
      validateFullName() &&
      validatePassWord() &&
      validateConfirmPassWord() &&
      validateEmail() &&
      validatePhone() &&
      validateGender();
    if (!userOk) {
      return;
    }
    const res = await register(userData);
    if (res.status === 200) {
      console.log(res);
      setUserId(res.data.id);
      toast.success("Create Successful");
      localStorage.setItem("app_token", "Bearer " + res.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;

      setChangeConfirmRegister(2);
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

    const res = await SendCodeToEmail(userData.email);
    if (res.status === 200) {
      toast.success(res.data);
    } else if (res.status < 500) {
      toast.error(res.data || "Something went Wrong!");
    } else {
      toast.error("Something went Wrong!");
    }
  };

  const handleConfirmCode = async (e) => {
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
    const confirm = await VerifyUserByCode(userId, code);
    if (confirm.status === 200) {
      toast.success("Confirm Successful");
      navigate("/login");
    } else if (confirm.status < 500) {
      toast.error(confirm.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="register">
      <div className="wrapper">
        <div className="container main py-5">
          <div className="row">
            <div className="col-md-6 side-image">
              <img src={logo} alt="" className="img-left" />
            </div>
            {changeConfirmRegister === 1 ? (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <h1 className="header-1 py-3">Sign Up</h1>
                    {/* Username */}
                    <div className="input-field">
                      <input
                        type="text"
                        className="input"
                        id="username"
                        required
                        autoComplete="off"
                        name="userName"
                        onBlur={validateUserName}
                        ref={dataRef}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="Username">UserName</label>
                      {dataError.userName && (
                        <span className="error">{dataError.userName}</span>
                      )}
                    </div>
                    {/* FullName */}
                    <div className="input-field">
                      <input
                        type="text"
                        className="input"
                        id="fullname"
                        required
                        autoComplete="off"
                        name="fullName"
                        onBlur={validateFullName}
                        ref={dataRef}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="fullname">Fullname</label>
                      {dataError.fullName && (
                        <span className="error">{dataError.fullName}</span>
                      )}
                    </div>
                    {/* Password */}
                    <div className="input-field">
                      <input
                        type="password"
                        className="input"
                        id="password"
                        required
                        name="password"
                        ref={dataRef}
                        onBlur={validatePassWord}
                        onChange={(e) => handleChange(e)}
                        autoComplete="off"
                      />
                      <label htmlFor="password">Password</label>
                      {dataError.password && (
                        <span className="error">{dataError.password}</span>
                      )}
                    </div>
                    {/* Confirmpassword */}
                    <div className="input-field">
                      <input
                        type="password"
                        className="input"
                        id="Confirmpassword"
                        name="confirmpassword"
                        ref={dataRef}
                        onBlur={validateConfirmPassWord}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <label htmlFor="password">Confirm Password</label>
                      {dataError.confirmpassword && (
                        <span className="error">
                          {dataError.confirmpassword}
                        </span>
                      )}
                    </div>
                    {/* Email */}
                    <div className="input-field">
                      <input
                        type="text"
                        className="input"
                        id="email"
                        required
                        name="email"
                        onBlur={validateEmail}
                        ref={dataRef}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="email">Email</label>
                      {dataError.email && (
                        <span className="error">{dataError.email}</span>
                      )}
                    </div>
                    {/* Phone number */}
                    <div className=" mx-2">
                      <label htmlFor="email">Phone Number</label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        id="registerPhoneNumber"
                        defaultCountry="VN"
                        name="phoneNumber"
                        required
                        ref={dataRef}
                        onBlur={validatePhone}
                        onChange={(e) => handlePhone(e)}
                      />
                    </div>
                    {dataError.phoneNumber && (
                      <p className="error-2 ml-2">{dataError.phoneNumber}</p>
                    )}
                    {/* Gender */}
                    <div className="d-flex my-2">
                      <div className="col-3">
                        <label htmlFor="registerGender" className="form-label">
                          Gender:
                        </label>
                      </div>

                      <div className="col-3 form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="radioMale"
                          required
                          name="gender"
                          value="male"
                          onBlur={validateGender}
                          ref={dataRef}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="form-check-label" htmlFor="radioMale">
                          Male
                        </label>
                      </div>
                      <div className="col-3 form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="radioFemale"
                          name="gender"
                          value="female"
                          onBlur={validateGender}
                          ref={dataRef}
                          onChange={(e) => handleChange(e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="radioFemale"
                        >
                          Female
                        </label>
                      </div>
                      <div className="col-3 form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="radioOther"
                          name="gender"
                          value="other"
                          onBlur={validateGender}
                          ref={dataRef}
                          onChange={(e) => handleChange(e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="radioOther"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                    {dataError.gender && (
                      <p className="error-2 ml-2                                                        ">
                        {dataError.gender}
                      </p>
                    )}
                    <div className="input-field mx-5">
                      <input
                        type="submit"
                        className="submit"
                        value="Sign Up"
                        onClick={(e) => handleSubmit(e)}
                      />
                    </div>
                    <div className="signin">
                      <span>
                        Already have an account?{" "}
                        <Link to="/login">Log in here</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <header className="header-2">
                      Email account confirmation
                    </header>
                    {/* Code */}
                    <div className="form-group">
                      <label htmlFor="inputEmail">Code</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control text-center"
                          id="inputEmail"
                          onBlur={validateInsertCode}
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="fa fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                      {dataError.code && (
                        <p className="error-2 ml-2                                                        ">
                          {dataError.code}
                        </p>
                      )}
                      <div className="invalid-feedback">
                        Please provide a valid email address.
                      </div>
                    </div>
                    <div className="">
                      <input
                        type="submit"
                        className="btn btn-primary w-25"
                        value="Confirm"
                        onClick={(e) => handleConfirmCode(e)}
                      />
                      <input
                        type="submit"
                        className="btn btn-primary w-25 ml-3"
                        value="Resend"
                        onClick={(e) => handleSendCodeToEmail(e)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
