import { useState } from "react";
import "./Login.scss";
// Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
//Facebooklogin
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
function Login() {
  const [checkLoginstyle, SetcheckLoginstyle] = useState(1);

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
              <div className="text">
                <p>
                  Hello the community of developers <i>- Achay</i>
                </p>
              </div>
            </div>

            {checkLoginstyle === 1 ? (
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
                        autocomplete="off"
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
                    <div className="input-field">
                      <input type="submit" className="submit" value="Sign In" />
                    </div>
                    {/* Change Style Login  */}
                    <div className="px-4 mb-2 text-center">
                      <div className="text-muted"> or sign up using </div>
                      <div className="">
                        {checkLoginstyle === 1 ? (
                          <>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="mx-5">
                                <i
                                  className="fa fa-2x fa-phone"
                                  onClick={() =>
                                    SetcheckLoginstyle(checkLoginstyle + 1)
                                  }
                                ></i>
                              </div>
                              <div className="mx-5">
                                <i
                                  className="fa-brands fa-2x fa-facebook"
                                  onClick={() =>
                                    SetcheckLoginstyle(checkLoginstyle + 2)
                                  }
                                ></i>
                              </div>
                            </div>
                          </>
                        ) : checkLoginstyle === 2 ? (
                          <>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="mx-5">
                                <i
                                  className="fa fa-2x fa-user"
                                  onClick={() =>
                                    SetcheckLoginstyle(checkLoginstyle)
                                  }
                                ></i>
                              </div>
                              <div className="mx-5">
                                <i className="fa-brands fa-2x fa-facebook "></i>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex align-items-center justify-content-center">
                              <div className="mx-5">
                                <i className="fa fa-2x fa-phone "></i>
                              </div>
                              <div className="mx-5">
                                <i className="fa fa-2x fa-user "></i>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="signin">
                      <span>
                        Not a member? <a href="#">Register in here</a>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : checkLoginstyle === 2 ? (
              <>
                {/* Login Phone */}

                <div className="col-6 px-4">
                  <div className="text-center mt-5">
                    <div className="form-phone">
                      <header className="text-center">Sign In</header>
                    </div>
                  </div>

                  <div className="px-4 mb-2">
                    <div className="mt-5">
                      <label htmlFor="InputPhone" className="form-label mt-5">
                        Phone Number:
                      </label>

                      <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="VN"
                      />

                      <div id="emailHelp" className="form-text">
                        We'll never share your phone with anyone else.
                      </div>
                    </div>

                    <button className="btn btn-primary text-center mt-4">
                      Submit
                    </button>
                  </div>
                  {/* ChangeLogin */}
                  <div className="px-4 mb-2 text-center">
                    <div className="text-muted"> or sign up using </div>
                    <div className="">
                      {checkLoginstyle === 1 ? (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-phone"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 1)
                                }
                              ></i>
                            </div>
                            <div className="mx-5">
                              <i
                                className="fa-brands fa-2x fa-facebook"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 2)
                                }
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : checkLoginstyle === 2 ? (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-user"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle - 1)
                                }
                              ></i>
                            </div>
                            <div className="mx-5">
                              <i
                                className="fa-brands fa-2x fa-facebook"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 2)
                                }
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i className="fa fa-2x fa-phone "></i>
                            </div>
                            <div className="mx-5">
                              <i className="fa fa-2x fa-user "></i>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login Facebook */}

                <div className="col-6 px-4">
                  <div className="text-center">
                    <div className="form-fb">
                      <header className="text-center header-fb">Sign In</header>
                    </div>
                  </div>
                  <div className="px-4 mt-5">
                    <div className="mt-5 text-center">
                      <FacebookLogin
                        className="rounded-pill"
                        appId="505300141422455"
                        autoLoad={true}
                        fields="name,email,picture"
                        render={(renderProps) => (
                          <button className="btn btn-primary">
                            <i className="fab fa-facebook"></i> Facebook Login
                          </button>
                        )}
                      />
                    </div>
                  </div>
                  {/* ChangeLogin of Facebook */}
                  <div className="px-4 mb-2 text-center">
                    <div className="text-muted"> or sign up using </div>
                    <div className="">
                      {checkLoginstyle === 1 ? (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-phone"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 1)
                                }
                              ></i>
                            </div>
                            <div className="mx-5">
                              <i
                                className="fa-brands fa-2x fa-facebook"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 2)
                                }
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : checkLoginstyle === 2 ? (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-user"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle)
                                }
                              ></i>
                            </div>
                            <div className="mx-5">
                              <i
                                className="fa-brands fa-2x fa-facebook"
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle + 2)
                                }
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-phone "
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle - 2)
                                }
                              ></i>
                            </div>
                            <div className="mx-5">
                              <i
                                className="fa fa-2x fa-user "
                                onClick={() =>
                                  SetcheckLoginstyle(checkLoginstyle - 1)
                                }
                              ></i>
                            </div>
                          </div>
                        </>
                      )}
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
