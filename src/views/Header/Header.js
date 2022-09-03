import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "../../styles/views/Header/HeaderStyle.scss"
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
                            <i class="fa fa-3x fa-image"></i>
                        </a>
                        {/* Link */}
                        <ul className="nav col-12 col-lg-auto me-lg-auto  justify-content-center ">
                            <li><Link to="/" className="btn btn-style1 px-2 mx-2 my-1">Home 🏠</Link></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">Services 💉</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">Contact 📱</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">About Us 🧑‍🤝‍🧑</a></li>
                            <li><a href="." className="btn btn-style1 px-2 mx-2 my-1">FAQs ❓</a></li>
                        </ul>
                        {/* Search */}
                        <form className="col-12 col-lg-auto mb-4 mb-lg-0  me-lg-3">
                            <input type="search" className="form-control form-control-dark" aria-label="Search" />
                        </form>
                        {/* Login, Sign Up */}
                        <div className="text-end">
                            <Link to="/login" type="button" className="btn btn-style1-outline me-2">Login 🗝️</Link>
                            <button type="button" className="btn btn-style1">Sign-up 🚪</button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;