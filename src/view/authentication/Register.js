import "./Register.scss";
import logo from '../../assets/images/logo/Logo-lg.png'
//Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
//Router
import { Link } from "react-router-dom";
function Register() {
  return (
    <div className="register">
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <img
                src={logo}
                alt=""
                className="img-left"
              />
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Create Account</header>
                {/* Username */}
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="username"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="Username">UserName</label>
                </div>
                {/* FullName */}
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="fullname"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="fullname">Fullname</label>
                </div>
                {/* Password */}
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    id="password"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                {/* Confirmpassword */}
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    id="Confirmpassword"
                    required
                  />
                  <label htmlFor="password">Confirm Password</label>
                </div>
                {/* Email */}
                <div className="input-field">
                  <input type="email" className="input" id="email" required />
                  <label htmlFor="email">Email</label>
                </div>
                {/* Phone number */}
                <div className=" mx-2">
                  <label htmlFor="email">Phone Number</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    id="registerPhoneNumber"
                    defaultCountry="VN"
                    required
                    onChange={() => { }}
                  />
                </div>
                {/* Birthday */}
                <div className="input-field">
                  <label htmlFor="date">Date</label>
                  <br />
                  <input type="date" className="input" id="date" required />
                </div>
                {/* Gender */}
                <div className="d-flex">
                  <div className="col-3">

                    <label htmlFor="registerGender" className="form-label">
                      Gender:
                    </label>
                  </div>
                  <div className="col-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkMale"
                      value="Male"
                      required
                    />
                    <label className="form-check-label" htmlFor="checkMale">
                      Female
                    </label>
                  </div>
                  <div className="col-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkFemale"
                      value="Female"
                    />
                    <label className="form-check-label" htmlFor="checkFemale">
                      Male
                    </label>
                  </div>
                  <div className="col-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkOther"
                      value="Other"
                    />
                    <label className="form-check-label" htmlFor="checkOther">
                      Other
                    </label>
                  </div>
                </div>
                <div className="input-field mx-5">
                  <input type="submit" className="submit" value="Sign Up" />
                </div>
                <div className="signin">
                  <span>
                    Already have an account? <Link to='/login'>Log in here</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
