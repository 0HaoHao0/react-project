import React, { Component } from 'react'
import Header from '../Header/Header';
import "../../styles/views/Login/LoginStyle.scss"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true
        }
    }
    changeLoginStyle = (e) => {
        this.setState(
            {
                logic: this.state.logic ? false : true
            }
        )
    }
    render() {
        let checkLoginstyle = this.state.logic;

        return (
            <div className=''>
                <Header />
                {/* Login card */}
                <div className='d-flex align-items-center justify-content-center'>
                    <div className="logincard card p-4 my-4">
                        <div className='col-12 text-center'>
                            {
                                checkLoginstyle
                                    ?
                                    <i class="fa fa-6x fa-user"></i>
                                    :
                                    <i class="fa fa-6x fa-phone"></i>

                            }
                            <h2>Welcome To Join Us</h2>
                        </div>
                        <hr />
                        {
                            checkLoginstyle
                                ?
                                <>
                                    <div className='col-12 px-4'>
                                        <div className='col-12'><strong> Sign in by Account: </strong></div>
                                    </div>
                                    <div className='col-12 px-4 mb-2'>
                                        <form>
                                            <div class="mb-1">
                                                <label for="exampleInputEmail1" class="form-label">Account:</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div class="mb-1">
                                                <label for="exampleInputPassword1" class="form-label">Password:</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <button type="submit" class="btn btn-primary text-center">Submit</button>
                                        </form>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='col-12 px-4'>
                                        <div className='col-12'><strong> Sign in by Phone Number: </strong></div>
                                    </div>
                                    <div className='col-12 px-4  mb-2'>
                                        <form>
                                            <div class="mb-1">
                                                <label for="exampleInputEmail1" class="form-label">Phone Number:</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" class="form-text">We'll never share your phone with anyone else.</div>
                                            </div>

                                            <button type="submit" class="btn btn-primary text-center">Submit</button>
                                        </form>
                                    </div>
                                </>
                        }



                        {/*  */}
                        <div className='col-12 px-4  mb-2 text-center'>
                            <div className='col-12 text-muted'> or sign up using </div>
                            <div className='row'>
                                {
                                    checkLoginstyle
                                        ?
                                        <div className='col-6' onClick={() => this.changeLoginStyle()}><i class="fa fa-2x fa-phone "></i></div>
                                        :
                                        <div className='col-6' onClick={() => this.changeLoginStyle()}><i class="fa fa-2x fa-user "></i></div>
                                }
                                <div className='col-6'><i class="fa-brands fa-2x fa-facebook "></i></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;