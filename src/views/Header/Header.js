import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../../styles/views/Header/HeaderStyle.scss"

import Logo from "../../assets/images/Logo.png"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}

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
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">Contact 📱</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">About Us 🧑‍🤝‍🧑</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">FAQs ❓</a></li>
                        </ul>
                        {/* Search */}
                        <div className="col-12 col-lg-auto mb-4 mb-lg-0  me-lg-3">
                            <input type="text" placeholder='Search...' className="form-control form-control-dark" aria-label="Search"
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
                        {/* Login, Sign Up */}
                        <div className="text-end">
                            <NavLink to="/login" type="button" className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1-outline me-2"}>Login 🗝️</NavLink>
                            <NavLink to='/register' type="button" className={({ isActive }) => isActive ? "btn btn-active me-2" : "btn btn-style1"}>Sign-up 🚪</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;