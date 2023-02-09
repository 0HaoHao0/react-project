import { useState } from "react";
import "./Login.scss";
// Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
//Facebooklogin
// None
function Login() {
  const [checkLoginStyle, setCheckLoginStyle] = useState(1);

  return (
    <div className="login">
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <img
                src="https://images.pexels.com/photos/208474/pexels-photo-208474.jpeg"
                alt=""
                className="img-login"
              />
            </div>

            {checkLoginStyle === 1 ? (
              <>
                <div className="col-md-6 right">
                  <div className="input-box">
                    <header>Sign In</header>
                    <div className="input-field">
                      <input
                        type="text"
                        className="input"
                        id="email"
                        required
                        autoComplete="off"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                      <input
                        type="password"
                        className="input"
                        id="password"
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field mx-5">
                      <input type="submit" className="submit" value="Sign In" />
                    </div>
                    {/* Change Style Login  */}
                    <div className="px-4 mb-2 text-center">
                      <hr />
                      <div className="text-muted"> or using </div>
                      <div className="">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="mx-5" onClick={() => { setCheckLoginStyle(2) }}>
                            <i
                              className="fa-solid fa-2x fa-phone"
                            ></i>
                          </div>

                          <div className="mx-5" onClick={() => { setCheckLoginStyle(3) }}>
                            <i
                              className="fa-brands fa-2x fa-facebook"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="signin">
                      <span>
                        Not a member? <Link to='/register'>Register in here</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : checkLoginStyle === 2 ? (
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
                          <div className="mx-5" onClick={() => { setCheckLoginStyle(1) }}>
                            <i
                              className="fa fa-2x fa-user"

                            ></i>
                          </div>

                          <div className="mx-5" onClick={() => { setCheckLoginStyle(3) }}>
                            <i
                              className="fa-brands fa-2x fa-facebook"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
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
                          <div className="mx-5" onClick={() => { setCheckLoginStyle(2) }}>
                            <i
                              className="fa fa-2x fa-phone "
                            ></i>
                          </div>
                          <div className="mx-5" onClick={() => { setCheckLoginStyle(1) }}>
                            <i
                              className="fa fa-2x fa-user "
                            ></i>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Login;
