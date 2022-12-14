import React, { Component } from 'react'
import '../../styles/views/Register/RegisterStyle.scss'
// Phone input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { registerApi } from '../../services/ApiConnection/registerApi';
import { toast } from 'react-toastify';
import withRouter from '../../components/HOC/withRouter';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true
        }
    }
    // 
    registerData = {
        userName: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: null,
        birthDate: new Date(),
        gender: '',
    }

    // Check Gender
    checkGender = (check, unCheckOne, unCheckTwo, e) => {
        document.getElementById(check).checked ? this.registerData.gender = e.target.value : this.registerData.gender = null;
        document.getElementById(unCheckOne).disabled
            ? document.getElementById(unCheckOne).disabled = false
            : document.getElementById(unCheckOne).disabled = true;
        document.getElementById(unCheckTwo).disabled
            ? document.getElementById(unCheckTwo).disabled = false
            : document.getElementById(unCheckTwo).disabled = true;
    }


    // Account
    handleSubmit = async (e) => {
        e.preventDefault();

        let registerPassword = document.getElementById('registerPassword');
        let registerConfirmPassword = document.getElementById('registerConfirmPassword');


        if (registerPassword.value !== registerConfirmPassword.value) {
            registerConfirmPassword.setCustomValidity("Passwords Don't Match");
        }
        else {
            registerConfirmPassword.setCustomValidity("");
            let response;
            await registerApi(this.registerData, (res) => { response = res })
            if (response.status === 200) {
                toast.success("Create Successful");
                this.props.navigate('/main');

            }
            else if (response.status === 400) {
                toast.error("Please try again")
            }
        }
    }


    render() {

        return (
            <div>
                {/* Register card */}
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="register-card card p-4 my-4">
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
                            <form className='col-12 px-4 mb-2 ' onSubmit={(e) => { this.handleSubmit(e) }}  >
                                <div className="mb-1">
                                    <label htmlFor="registerUserName" className="form-label">User Name:</label>
                                    <input type="text" className="form-control" id="registerUserName"
                                        onChange={(e) => { this.registerData.userName = e.target.value; }} required />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerFullName" className="form-label">Full Name:</label>
                                    <input type="text" className="form-control" id="registerFullName"
                                        onChange={(e) => { this.registerData.fullName = e.target.value; }} required />

                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerPassword" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="registerPassword" required
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        onChange={(e) => { this.registerData.password = e.target.value; }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerConfirmPassword" className="form-label">Confirm Password:</label>
                                    <input type="password" className="form-control" id="registerConfirmPassword" required
                                        onInput={(e) => e.target.setCustomValidity('')}
                                        onChange={(e) => { this.registerData.confirmPassword = e.target.value; }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="registerEmail" className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="registerEmail" required
                                        onChange={(e) => { this.registerData.email = e.target.value; }} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <label htmlFor="registerPhoneNumber" className="form-label">Phone Number:</label>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    id="registerPhoneNumber"
                                    defaultCountry="VN"
                                    required
                                    onChange={(e) => { this.registerData.phoneNumber = e; }}
                                />
                                <div className="mb-1">
                                    <label htmlFor="registerBirthday" className="form-label">Birthday:</label>
                                    <input type="date" className="form-control" id="registerBirthday"
                                        onChange={(e) => { this.registerData.birthDate = e.target.value; }} required />
                                </div>

                                <div className="mb-1 row">
                                    <label htmlFor="registerGender" className="col-3 form-label text-nowrap ">Gender:</label>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkMale" value="Male" required
                                            onClick={(e) => this.checkGender("checkMale", "checkFemale", "checkOther", e)} />
                                        <label className="form-check-label" htmlFor="checkMale">Male</label>
                                    </div>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkFemale" value="Female"
                                            onClick={(e) => this.checkGender("checkFemale", "checkMale", "checkOther", e)} />
                                        <label className="form-check-label" htmlFor="checkFemale">Female</label>
                                    </div>
                                    <div className="col-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="checkOther" value="Other"
                                            onClick={(e) => this.checkGender("checkOther", "checkFemale", "checkMale", e)} />
                                        <label className="form-check-label" htmlFor="checkOther">Other</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary text-center">Submit</button>
                            </form>
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
            </div >
        );
    }
}

export default withRouter(Register);