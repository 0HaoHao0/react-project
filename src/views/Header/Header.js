import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import "../../styles/views/Header/HeaderStyle.scss"

import Logo from "../../assets/images/Logo.png"
import { connect } from 'react-redux';
import { clearUserData } from '../../features/user/userSlice';
import withRouter from '../../components/HOC/withRouter';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logOut = async (e) => {
        await this.props.dispatch(clearUserData());
        this.props.navigate('/login');
    }

    render() {

        return (
            <header className="p-1">
                <div className="container">
                    <div className="row">
                        {/* Logo */}
                        {/* Link */}
                        <ul className="nav col-12 justify-content-center align-items-center  mb-1">
                            <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                                <img className='header-logo' src={Logo} alt="Logo" />
                            </a>
                            <li><NavLink to="/main"
                                className={({ isActive }) => isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"}
                            >Home 🏠</NavLink></li>
                            <li><NavLink to='/service'
                                className={({ isActive }) => isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"}
                            >Services 💉</NavLink></li>
                            <li><NavLink to="/contact"
                                className={({ isActive }) => isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"}
                            >Contact 📱</NavLink></li>
                            <li><NavLink to="/aboutus" className={({ isActive }) =>
                                isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"
                            } >About Us 🧑‍🤝‍🧑</NavLink></li>
                            {
                                this.props.user.id !== null
                                    ?
                                    <li><NavLink to="/Appointment" className={({ isActive }) =>
                                        isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"
                                    } >Appointment 📅</NavLink></li>
                                    : null
                            }
                            {
                                this.props.user.role === "Receptionist" || this.props.user.role === "Patient" ?
                                    <li><NavLink to="/faq" className={({ isActive }) =>
                                        isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"
                                    } >FAQs ❓</NavLink></li>
                                    : null
                            }

                        </ul>
                        {/* Search */}

                        {/* <div className="col-6">
                                <input type="text" placeholder="Search..." className="form-control form-control-dark " aria-label="Search"
                                    // Page search
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            let text = e.target.value;
                                            if (window.find(text)) {
                                                console.log(window.find(text));
                                            }
                                        }
                                    }} />
                            </div> */}


                        {this.props.user.id == null
                            ?
                            <>
                                <div className="col-12  d-flex justify-content-center align-items-center mb-2 ">

                                    <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1-outline me-2"}>Login 🗝️</NavLink>
                                    <NavLink to='/register' className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1"}>Sign-up 🚪</NavLink>
                                </div>
                            </>
                            :
                            <>
                                <div className='col-12  d-flex justify-content-center align-items-center mb-2'>

                                    <Link to="/profile" className="btn btn-style1-outline me-2">Welcome, {this.props.user.fullName}</Link>
                                    {this.props.user.role === 'Administrator'
                                        ?
                                        <Link to='/admin/' className="btn btn-style1 me-2" >Admin</Link>
                                        : null
                                    }
                                    <button onClick={(e) => this.logOut(e)} className="btn btn-style1" >Log-Out 🚪</button>
                                </div>
                            </>

                        }
                    </div>

                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withRouter(Header));