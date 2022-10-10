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
            <header className="p-3">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center ">
                        {/* Logo */}
                        <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                            <img className='header-logo' src={Logo} alt="Logo" />
                        </a>
                        {/* Link */}
                        <ul className="nav col-12 col-lg-auto me-lg-auto  justify-content-center ">
                            <li><NavLink to="/main" className={({ isActive }) =>
                                isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"
                            } >Home 🏠</NavLink></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">Services 💉</a></li>
                            <li><NavLink to="/contact" className={({ isActive }) =>
                                isActive ? "btn btn-active px-2 mx-2 my-1" : "btn btn-style1 px-2 mx-2 my-1"
                            } >Contact 📱</NavLink></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1" >About Us 🧑‍🤝‍🧑</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">FAQs ❓</a></li>
                        </ul>
                        {/* Search */}
                        <div className="col-12 col-lg-auto mb-4 mb-lg-0  me-lg-3">
                            <input type="text" placeholder="Search..." className="form-control form-control-dark" aria-label="Search"
                                // Page search
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        let text = e.target.value;
                                        if (window.find(text)) {
                                            console.log(window.find(text));
                                        }
                                    }
                                }} />
                        </div>

                        {this.props.user.id == null
                            ?
                            <>
                                <div className="text-end">
                                    <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1-outline me-2"}>Login 🗝️</NavLink>
                                    <NavLink to='/register' className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1"}>Sign-up 🚪</NavLink>
                                </div>
                            </>
                            :
                            <>
                                <div className='text-end'>
                                    <Link to="/profile" className="btn btn-style1-outline me-2">Welcome, {this.props.user.fullName}</Link>
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