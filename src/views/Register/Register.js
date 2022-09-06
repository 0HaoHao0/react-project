import React, { Component } from 'react'
import '../../styles/views/Register/RegisterStyle.scss'
import { toast } from 'react-toastify'
// Phone input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true
        }
    }
    // 
    registerInfo = {
        acount: null,
        password: null,
        email: null,
        phoneNumber: null,
        birthday: new Date(),
        address: null,
        gender: null,


    }
    // Logic
    changeRegisterStyle = (e) => {
        this.setState(
            {
                logic: this.state.logic ? false : true
            }
        )
    }
    // Account

    registerAccount = (e) => {
        toast("Check");
    }


    render() {
        console.log(this.props);

        return (
            <div>
                {/* Register card */}
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="registercard card p-4 my-4">
                        {/* Logo */}
                        <div className='col-12 text-center'>
                            <i className="fa fa-6x fa-id-card"></i>
                            <h2>Welcome To Join Us</h2>
                        </div>
                        <hr />
                        <>
                            {/* Register Form */}

                            <div className='col-12 px-4'>
                                <div className='col-12'><strong> Register Form: </strong></div>
                            </div>
                            <div className='col-12 px-4 mb-2'>
                                <div className="mb-1">
                                    <label htmlFor="registerAccount" className="form-label">Account:</label>
                                    <input type="text" className="form-control" id="registerAccount"
                                        onChange={(e) => { this.registerInfo.acount = e.target.value; }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerPassword" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="registerPassword"
                                        onChange={(e) => { this.registerInfo.password = e.target.value; }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerEmail" className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="registerEmail"
                                        onChange={(e) => { this.registerInfo.email = e.target.value; }} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <label htmlFor="registerPhoneNumber" className="form-label">Phone Number:</label>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    id="registerPhoneNumber"
                                    defaultCountry="VN"
                                    onChange={(e) => { this.registerInfo.phoneNumber = e.target.value; }}
                                />
                                <div className="mb-1">
                                    <label htmlFor="registerBirthday" className="form-label">Birthday:</label>
                                    <input type="date" className="form-control" id="registerBirthday"
                                        onChange={(e) => { this.registerInfo.birthday = e.target.value; }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerAddress" className="form-label">Address:</label>
                                    <input type="text" className="form-control" id="registerAddress"
                                        onChange={(e) => { this.registerInfo.address = e.target.value; }} />
                                </div>
                                <div className="mb-1 row">
                                    <label htmlFor="registerGender" className="col-3 form-label">Gender:</label>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkMale" value="Male"
                                            onClick={(e) => {
                                                document.getElementById("checkMale").checked ? this.registerInfo.gender = e.target.value : this.registerInfo.gender = null;
                                                document.getElementById("checkFemale").disabled
                                                    ? document.getElementById("checkFemale").disabled = false
                                                    : document.getElementById("checkFemale").disabled = true;
                                                document.getElementById("checkOther").disabled
                                                    ? document.getElementById("checkOther").disabled = false
                                                    : document.getElementById("checkOther").disabled = true;
                                            }} />
                                        <label className="form-check-label" htmlFor="checkMale">Male</label>
                                    </div>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkFemale" value="Female"
                                            onClick={(e) => {
                                                document.getElementById("checkFemale").checked ? this.registerInfo.gender = e.target.value : this.registerInfo.gender = null;
                                                document.getElementById("checkMale").disabled
                                                    ? document.getElementById("checkMale").disabled = false
                                                    : document.getElementById("checkMale").disabled = true;
                                                document.getElementById("checkOther").disabled
                                                    ? document.getElementById("checkOther").disabled = false
                                                    : document.getElementById("checkOther").disabled = true;
                                            }} />
                                        <label className="form-check-label" htmlFor="checkFemale">Female</label>
                                    </div>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkOther" value="Other"
                                            onClick={(e) => {
                                                document.getElementById("checkOther").checked ? this.registerInfo.gender = e.target.value : this.registerInfo.gender = null;
                                                document.getElementById("checkFemale").disabled
                                                    ? document.getElementById("checkFemale").disabled = false
                                                    : document.getElementById("checkFemale").disabled = true;
                                                document.getElementById("checkMale").disabled
                                                    ? document.getElementById("checkMale").disabled = false
                                                    : document.getElementById("checkMale").disabled = true;
                                            }} />
                                        <label className="form-check-label" htmlFor="checkOther">Other</label>
                                    </div>
                                </div>
                                <button onClick={(e) => this.registerAccount(e)} className="btn btn-primary text-center">Submit</button>
                            </div>
                        </>



                        {/* Change Style Login  */}
                        <div className='col-12 px-4  mb-2 text-center'>
                            <div className='col-12 text-muted'> or register using </div>
                            <div className='row'>
                                <div className='text-center'><i className="fa-brands fa-2x fa-facebook "></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;