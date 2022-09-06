import React, { Component } from 'react'
import "../../styles/views/Login/LoginStyle.scss"

import { toast } from 'react-toastify'
// Phone inut
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true
        }
    }
    // Logic
    changeLoginStyle = (e) => {
        this.setState(
            {
                logic: this.state.logic ? false : true
            }
        )
    }
    // Account

    submitAccount = (e) => {
        toast("");
    }
    // Phone 
    handlePhoneNumber = (e) => {
        console.log(e);
    }
    submitPhone = (e) => {
    }
    render() {
        let checkLoginstyle = this.state.logic;
        return (
            <div className=''>
                {/* Login card */}
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="logincard card p-4 my-4">
                        {/* Logo */}
                        <div className='col-12 text-center'>
                            {
                                checkLoginstyle
                                    ?
                                    <i className="fa fa-6x fa-user"></i>
                                    :
                                    <i className="fa fa-6x fa-phone"></i>

                            }
                            <h2>Welcome To Back Again</h2>
                        </div>
                        <hr />
                        {
                            checkLoginstyle
                                ?
                                <>
                                    {/* Login Account */}

                                    <div className='col-12 px-4'>
                                        <div className='col-12'><strong> Sign in by Account: </strong></div>
                                    </div>
                                    <div className='col-12 px-4 mb-2'>
                                        <div className="mb-1">
                                            <label htmlFor="inputAccount" className="form-label">Account:</label>
                                            <input type="text" className="form-control" id="inputAccount" aria-describedby="accout" />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="inputPassword" className="form-label">Password:</label>
                                            <input type="password" className="form-control" id="inputPassword" />
                                        </div>
                                        <button onClick={(e) => this.submitAccount(e)} className="btn btn-primary text-center">Submit</button>
                                    </div>
                                </>
                                :
                                <>
                                    {/* Login Phone */}

                                    <div className='col-12 px-4'>
                                        <div className='col-12'><strong> Sign in by Phone Number: </strong></div>
                                    </div>
                                    <div className='col-12 px-4  mb-2'>
                                        <div className="mb-1">
                                            <label htmlFor="InputPhone" className="form-label">Phone Number:</label>

                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                defaultCountry="VN"
                                                onChange={(e) => this.handlePhoneNumber(e)}
                                            />

                                            <div id="emailHelp" className="form-text">We'll never share your phone with anyone else.</div>
                                        </div>

                                        <button onClick={(e) => this.submitPhone()} className="btn btn-primary text-center">Submit</button>
                                    </div>
                                </>
                        }



                        {/* Change Style Login  */}
                        <div className='col-12 px-4  mb-2 text-center'>
                            <div className='col-12 text-muted'> or sign up using </div>
                            <div className='row'>
                                {
                                    checkLoginstyle
                                        ?
                                        <div className='col-6' onClick={() => this.changeLoginStyle()}><i className="fa fa-2x fa-phone "></i></div>
                                        :
                                        <div className='col-6' onClick={() => this.changeLoginStyle()}><i className="fa fa-2x fa-user "></i></div>
                                }
                                <div className='col-6'><i className="fa-brands fa-2x fa-facebook "></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;