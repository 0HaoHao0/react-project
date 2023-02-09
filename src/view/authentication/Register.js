import "./Register.scss";
//Phone input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Register() {
  return (
    <div className="register">
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              <img
                src="https://images.pexels.com/photos/208474/pexels-photo-208474.jpeg"
                alt=""
                className="img-left"
              />
              <div className="text">
                <p>
                  Hello the community of developers <i>- Achay</i>
                </p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Create account</header>
                {/* Username */}
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="username"
                    required
                    autocomplete="off"
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
                    autocomplete="off"
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
                    autocomplete="off"
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
                <div className="mb-3 mx-2">
                  <label htmlFor="email">Phone Number</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    id="registerPhoneNumber"
                    defaultCountry="VN"
                    required
                  />
                </div>
                {/* Birthday */}
                <div className="input-field">
                  <input
                    type="date"
                    className="input"
                    id="birthday"
                    required
                    autocomplete="off"
                    value="2023-01-01"
                  />
                  <label htmlFor="birthday">Birthday</label>
                </div>
                {/* Gender */}
                <div className="mb-1 mx-2 d-flex">
                  <label htmlFor="registerGender" className="form-label">
                    Gender:
                  </label>
                  <div className="mx-1 col-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkMale"
                      value="Male"
                      required
                    />
                    <label className="form-check-label" htmlFor="checkMale">
                      Male
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
                      Female
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
                <div className="input-field">
                  <input type="submit" className="submit" value="Sign Up" />
                </div>
                <div className="signin">
                  <span>
                    Already have an account? <a href="#">Log in here</a>
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
