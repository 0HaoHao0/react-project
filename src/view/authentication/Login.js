import { useState } from "react";
import "./Login.scss";
import logo from "../../assets/images/logo/Logo-lg.png";
// Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
//toast
import { toast } from "react-toastify";
//Router
import { Link, useNavigate } from "react-router-dom";
//Facebooklogin
// None
//API
import {
  login,
  getUserInfo,
  forgotpassword,
} from "../../services/authorization/apILogin";
import axios from "axios";

//Redux
import { createUser } from "../../redux/features/userSlide";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
function Login() {
  const [loginStyle, setLoginStyle] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [dataError, setDataError] = useState("");

  //Validate UserName
  const validateUserName = () => {
    if (userName.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        userName: "UserName cannot be empty!",
      }));
    } else if (userName.length < 5) {
      setDataError((prevState) => ({
        ...prevState,
        userName: "UserName cannot must be least 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        userName: "",
      }));
    }
  };

  //Validate Password
  const validatePassWord = () => {
    if (password.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        password: "Password cannot be empty!",
      }));
    } else if (password.length < 6) {
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
  };

  const handleSubmitForgetPassword = async (event) => {
    validateUserName();
    const res = await forgotpassword(userName);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const loginNormal = async (e) => {
    validateUserName();
    validatePassWord();

    Swal.fire({
      title: "Loading...",
      html: "Please wait a moment"
    })
    Swal.showLoading();
    const res = await login(userName, password);

    Swal.close()

    if (res.status === 200) {
      // Set header token
      localStorage.setItem("app_token", "Bearer " + res.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
      // Set time expires 
      const cookie = new Cookies();
      cookie.set('_to', 'fcb629f3192b94ad77929397722f54c2', { maxAge: 10800 })

      // Get user information
      let resonse = await getUserInfo();
      if (resonse.status !== 200) {
        return;
      }
      // Set Userinfo
      let userInfo = resonse.data;
      dispatch(createUser(userInfo));

      if (userInfo.role === "Administrator") {
        navigate("/admin");
        return;
      }

      if (userInfo.role === "Expert") {
        navigate("/expert");
        return;
      }

      if (userInfo.role === "Patient") {
        if (userInfo.emailConfirmed) {
          navigate("/home");
        }
        else {
          navigate("/emailconfirm");
        }
      }

    }
    else if (res.status !== 500) {
      let message = res.data;
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: message,
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <img src={logo} alt="logo" className="img-login" />
            </div>

            {loginStyle === 1 ? (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Sign In</header>
                    <div className="input-field">
                      <input
                        type="text"
                        className="input"
                        id="username"
                        defaultValue={userName}
                        onBlur={validateUserName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        required
                      />
                      <label htmlFor="username">Username</label>
                      {dataError.userName && (
                        <span className="error">{dataError.userName}</span>
                      )}
                    </div>
                    <div className="input-field">
                      <input
                        type="password"
                        className="input"
                        id="password"
                        required
                        defaultValue={password}
                        onBlur={validatePassWord}
                        onChange={(e) => {
                          setPassWord(e.target.value);
                        }}
                      />
                      <label htmlFor="password">Password</label>
                      {dataError.password && (
                        <span className="error">{dataError.password}</span>
                      )}
                    </div>
                    <div className="input-field mx-5">
                      <input
                        type="submit"
                        className="submit"
                        value="Sign In"
                        onClick={() => {
                          loginNormal();
                        }}
                      />
                    </div>
                    {/* Change Style Login  */}
                    <div className="px-4 mb-2 text-center">
                      <hr />
                      <div className="text-muted"> or using </div>
                      <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            key="phone"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(2);
                            }}
                          >
                            <i className="fa-solid fa-2x fa-phone"></i>
                          </div>

                          <div
                            key="facebook"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(3);
                            }}
                          >
                            <i className="fa-brands fa-2x fa-facebook"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="signin">
                      <span>
                        Not a member?{" "}
                        <Link to="/register">Register in here</Link>
                      </span>
                    </div>
                    <div className="signin">
                      <span>
                        <Link
                          onClick={() => {
                            setLoginStyle(4);
                          }}
                        >
                          Forget password?
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : loginStyle === 2 ? (
              <>
                {/* Login Phone */}

                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Sign In</header>
                    <div className="px-4">
                      <label htmlFor="InputPhone" className="form-label">
                        Phone Number:
                      </label>

                      <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="VN"
                        onChange={() => { }}
                      />

                      <div id="emailHelp" className="form-text">
                        We'll never share your phone with anyone else.
                      </div>

                      <button className="btn btn-primary text-center mt-4">
                        Submit
                      </button>
                    </div>
                    {/* ChangeLogin */}
                    <div className="px-4 mb-2 text-center">
                      <hr />
                      <div className="text-muted"> or using </div>
                      <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            key="user"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(1);
                            }}
                          >
                            <i className="fa fa-2x fa-user"></i>
                          </div>

                          <div
                            key="facebook"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(3);
                            }}
                          >
                            <i className="fa-brands fa-2x fa-facebook"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : loginStyle === 3 ? (
              <>
                {/* Login Facebook */}

                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Sign In</header>
                    <div className="input-field">
                      <div className=" text-center">
                        FaceBook
                        {/* <FacebookLogin
                        className="rounded-pill"
                        appId="505300141422455"
                        autoLoad={true}
                        fields="name,email,picture"
                        render={(renderProps) => (
                          <button className="btn btn-primary">
                            <i className="fab fa-facebook"></i> Facebook Login
                          </button>
                        )}
                      /> */}
                      </div>
                    </div>
                    {/* ChangeLogin of Facebook */}
                    <div className="px-4 mb-2 text-center">
                      <hr />
                      <div className="text-muted"> or using </div>
                      <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            key="phone"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(2);
                            }}
                          >
                            <i className="fa fa-2x fa-phone "></i>
                          </div>
                          <div
                            key="user"
                            className="mx-5 mouse"
                            onClick={() => {
                              setLoginStyle(1);
                            }}
                          >
                            <i className="fa fa-2x fa-user "></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Forget Password</header>
                    <div className="px-4">
                      <label htmlFor="InputPhone" className="form-label">
                        UserName:
                      </label>
                      <input
                        type="text"
                        onBlur={validateUserName}
                        defaultValue={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        className="form-control"
                      />
                      {dataError.userName && (
                        <span className="error">{dataError.userName}</span>
                      )}
                      <div id="emailHelp" className="form-text">
                        We'll never share your username with anyone else.
                      </div>

                      <button
                        className="btn btn-primary text-center mt-4"
                        onClick={() => {
                          handleSubmitForgetPassword();
                        }}
                      >
                        Submit
                      </button>
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

export default Login;
