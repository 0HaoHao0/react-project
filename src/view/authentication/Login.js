import { useState } from "react";
import "./Login.scss";
import logo from "../../assets/images/logo/Logo-lg.png";
// Phone input
import "react-phone-number-input/style.css";
//toast
import { toast } from "react-toastify";
//Router
import { Link, useNavigate } from "react-router-dom";
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

  const [forgotpasswordWaiting, setForgotpasswordWaiting] = useState(0);
  const handleForgotpasswordWaiting = () => {
    setForgotpasswordWaiting(30);
    const interval = setInterval(() => {
      setForgotpasswordWaiting((prev) => {
        let countdown = prev - 1;
        if(countdown === 0) {
          clearInterval(interval);
        }
        return countdown;
      });
    }, 1000);
  };
  
  //Validate UserName
  const validateUserName = () => {
    let result = true;
    if (userName.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        userName: "UserName cannot be empty!",
      }));
    } else if (userName.length < 5) {
      result = false;
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
    return result;
  };

  //Validate Password
  const validatePassWord = () => {
    let result = true;
    if (password.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        password: "Password cannot be empty!",
      }));
    } else if (password.length < 6) {
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

  const handleSubmitForgetPassword = async (event) => {

    let validated = validateUserName();
    if(validated === false) {
      return;
    }
    else {
      handleForgotpasswordWaiting();
    }

    Swal.fire({
      icon: "info",
      title: "Waiting for response..."
    });
    Swal.showLoading();
    const res = await forgotpassword(userName);
    if (res.status === 200) {
      toast.success(res.data);
    } else if (res.status < 500) {
      toast.error(res.data);
    } else {
      toast.error("Something went wrong!");
    }
    Swal.close();
  };

  const loginNormal = async (e) => {
    let userOk = validateUserName() && validatePassWord();
    if (!userOk) {
      return;
    }

    Swal.fire({
      title: "Loading...",
      html: "Please wait a moment",
    });
    Swal.showLoading();
    const res = await login(userName, password);
    Swal.close();

    if (res && res.status === 200) {
      // Set header token
      localStorage.setItem("app_token", "Bearer " + res.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
      // Set time expires
      const cookie = new Cookies();
      cookie.set("_to", "fcb629f3192b94ad77929397722f54c2", { maxAge: 10800 });

      // Get user information
      let resonse = await getUserInfo();
      if (resonse.status !== 200) {
        return;
      }
      // Set Userinfo
      let userInfo = resonse.data;
      dispatch(createUser(userInfo));

      switch (userInfo.role) {
        case "Administrator":
          navigate("/admin/user");
          return;
        case "Expert":
          navigate("/expert");
          return;
        case "Receptionist":
          navigate("/receptionist/appointment-queue");
          return;
        case "Doctor":
          navigate("/doctor/appointment-queue");
          return;
        case "Technician":
          navigate("/technician");
          return;
        case "Patient":
          if (userInfo.emailConfirmed) {
            navigate("/home");
          } else {
            navigate("/email-confirm");
          }
          return;
        default:
          break;
      }
      
   } else if (res && res.status < 500) {
      let message = res.data;
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something wrong!",
      });
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 col-sm-12 side-image">
              <img src={logo} alt="logo" className="img-login" />
            </div>

            {loginStyle === 1 ? (
              <>
                <div className="col-md-6 col-sm-12 right">
                  <div className="input-box">
                    <header>Sign In</header>
                    <div className="input-field col-md-12 col-sm-12">
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
                    <div className="input-field col-md-12 col-sm-12">
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            loginNormal();
                          }
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
                          Forgot password?
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : loginStyle === 2 ? (
              <>

              </>
            ) : loginStyle === 3 ? (
              <>

              </>
            ) : (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Forget Password</header>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Enter username or email..."
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

                      <div className="mt-4 d-flex align-items-center justify-content-between gap-2">
                        <button className="btn btn-danger" onClick={() => {
                          setLoginStyle(1);
                        }}>Back</button>
                        <button
                          disabled={forgotpasswordWaiting > 0}
                          className="btn btn-primary"
                          onClick={() => {
                            handleSubmitForgetPassword();
                          }}
                        >
                          Submit
                          {forgotpasswordWaiting > 0 ? `(${forgotpasswordWaiting})` : null}
                        </button>
                      </div>
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
