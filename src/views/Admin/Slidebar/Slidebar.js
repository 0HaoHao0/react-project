import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../../../styles/views/Admin/Slidebar/SlidebarStyle.scss"

class Slidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className="admin-slidebar bg-light p-3 " >
                    <a href="/" className="text-center link-dark text-decoration-none row">
                        <span> <i className="fa-solid fa-screwdriver-wrench"></i> </span>   <h5>Admin Page</h5>
                    </a>
                    <hr />
                    <div className='admin-scroll d-flex'>
                        <ul className="nav nav-pills" >
                            <li className='col-12 text-center'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark "}
                                    to="/admin/">
                                    <i className="fa-solid fa-house"></i>
                                    <span className='mx-2'>
                                        Home
                                    </span>
                                </NavLink>
                            </li>
                            <li className='col-12 text-center'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link link-dark active" : "nav-link link-dark "}
                                    to="/admin/contact">
                                    <i className="fa-solid fa-address-book"></i>
                                    <span className='mx-2'>
                                        Contact
                                    </span>
                                </NavLink>
                            </li>



                        </ul>
                    </div>
                    <hr />
                    <div className="row text-center">
                        <div className='dropend col-12'>
                            <button type="button" className="btn btn-danger button-dropend rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-power-off"></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href=".">Action</a></li>
                                <li><a className="dropdown-item" href=".">Another action</a></li>
                                <li><a className="dropdown-item" href=".">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default Slidebar;