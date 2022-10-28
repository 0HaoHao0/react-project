import React, { Component } from 'react'
import "../../styles/views/Login/LoginStyle.scss"

// Import Api
import { loginApi, loginAuthorize } from '../../services/ApiConnection/loginApi'

// Toastify
// import { toast } from 'react-toastify'
// Phone inut
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { toast } from 'react-toastify'

// 
import { connect } from 'react-redux'
import { setUserData } from '../../features/user/userSlice'
import withRouter from '../../components/HOC/withRouter'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: 1
        }
    }

    loginAccount = {
        username: null,
        password: null
    }

    loginPhone = null
    // Logic
    changeLogin = (e) => {
        this.setState(
            {
                logic: 1
            }
        )
    }
    changePhoneLogin = (e) => {
        this.setState(
            {
                logic: 2
            }
        )
    }
    changeFacebookLogin = (e) => {
        this.setState(
            {
                logic: 3
            }
        )
    }

    // Account

    submitAccount = async (e) => {
        let res = await loginApi(this.loginAccount);

        if (res.status === 200) {

            // Authorize
            let userAuthorize = await loginAuthorize(res.data.token);
            // Dispatch user information
            await this.props.dispatch(setUserData(userAuthorize.data))
            // Navigate
            this.props.navigate('/main');

        }
        else if (res.status === 401) {
            toast.error(res.data);
        }
        else {
            toast.error("Username or Password Can Not Blank");
        }


    }


    submitPhone = (e) => {

    }

    // Face login

    responseFacebook = () => {

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
                                checkLoginstyle === 1
                                    ?
                                    <i className="fa fa-6x fa-user"></i>
                                    : checkLoginstyle === 2
                                        ?
                                        <i className="fa fa-6x fa-phone"></i>
                                        :
                                        <i className="fab fa-6x fa-facebook"></i>
                            }
                        </div>
                        <hr />
                        {
                            checkLoginstyle === 1
                                ?
                                <>
                                    {/* Login Account */}

                                    <div className='col-12 px-4'>
                                        <div className='col-12'><strong> Sign in by Account: </strong></div>
                                    </div>
                                    <div className='col-12 px-4 mb-2'>
                                        <div className="mb-1">
                                            <label htmlFor="inputUsername" className="form-label">Username:</label>
                                            <input type="text" className="form-control" id="inputUsername" aria-describedby="accout"
                                                onChange={(e) => { this.loginAccount.username = e.target.value }} />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="inputPassword" className="form-label">Password:</label>
                                            <input type="password" className="form-control" id="inputPassword"
                                                onChange={(e) => { this.loginAccount.password = e.target.value }} />
                                        </div>
                                        <button onClick={(e) => this.submitAccount(e)} className="btn btn-primary text-center">Submit</button>
                                    </div>
                                </>
                                :
                                checkLoginstyle === 2
                                    ?
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
                                                    onChange={(e) => { this.loginPhone = e }}
                                                />

                                                <div id="emailHelp" className="form-text">We'll never share your phone with anyone else.</div>
                                            </div>

                                            <button onClick={(e) => this.submitPhone()} className="btn btn-primary text-center">Submit</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {/* Login Facebook */}

                                        <div className='col-12 px-4'>
                                            <div className='col-12'><strong> Sign in by Facebook: </strong></div>
                                        </div>
                                        <div className='col-12 px-4  mb-2'>
                                            <div className="mb-1 text-center ">
                                                <FacebookLogin
                                                    className="rounded-pill"
                                                    appId="505300141422455"
                                                    autoLoad={true}
                                                    fields="name,email,picture"
                                                    callback={() => this.responseFacebook()}
                                                    render={renderProps => (
                                                        <button onClick={renderProps.onClick} className='btn btn-primary'><i className="fab fa-facebook"></i> Facebook Login</button>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </>
                        }



                        {/* Change Style Login  */}
                        <div className='col-12 px-4  mb-2 text-center'>
                            <div className='col-12 text-muted'> or sign up using </div>
                            <div className='row'>
                                {
                                    checkLoginstyle === 1
                                        ?
                                        <>
                                            <div className='col-6' onClick={() => this.changePhoneLogin()}><i className="fa fa-2x fa-phone "></i></div>
                                            <div className='col-6' onClick={() => this.changeFacebookLogin()}><i className="fa-brands fa-2x fa-facebook "></i></div>
                                        </>
                                        : checkLoginstyle === 2
                                            ?
                                            <>
                                                <div className='col-6' onClick={() => this.changeLogin()}><i className="fa fa-2x fa-user "></i></div>
                                                <div className='col-6' onClick={() => this.changeFacebookLogin()}><i className="fa-brands fa-2x fa-facebook "></i></div>
                                            </>
                                            :
                                            <>
                                                <div className='col-6' onClick={() => this.changePhoneLogin()}><i className="fa fa-2x fa-phone "></i></div>
                                                <div className='col-6' onClick={() => this.changeLogin()}><i className="fa fa-2x fa-user "></i></div>
                                            </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withRouter(Login));