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
                <div className="admin-slidebar  p-3 " >
                    <a href="/" className="text-center text-white text-decoration-none row">
                        <span> <i className="fa fa-screwdriver-wrench "></i> </span>   <h5>Admin Page</h5>
                    </a>
                    <hr className='bg-light' />
                    <div className='admin-scroll d-flex'>
                        <ul className="nav " >
                            <li className='col-12 text-left my-2 '>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/">
                                    <i className="fa-solid fa-house "></i>
                                    <span className='mx-2'>Home</span>
                                </NavLink>
                            </li>

                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/user">
                                    <i className="fa fa-user"></i>
                                    <span className='mx-2'>
                                        User
                                    </span>
                                </NavLink>
                            </li>

                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/docter">
                                    <i className="fa fa-user-md"></i>
                                    <span className='mx-2'>
                                        Doctor
                                    </span>
                                </NavLink>
                            </li>

                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/service">
                                    <i className="fa fa-wine-glass-alt"></i>
                                    <span className='mx-2'>
                                        Service
                                    </span>
                                </NavLink>
                            </li>
                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/device">
                                    <i className="fa fa-wrench"></i>
                                    <span className='mx-2'>
                                        Device
                                    </span>
                                </NavLink>
                            </li>
                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/room">
                                    <i className="fa fa-hospital"></i>
                                    <span className='mx-2'>
                                        Room
                                    </span>
                                </NavLink>
                            </li>
                            <li className='col-12 text-left my-2'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/contact">
                                    <i className="fa-solid fa-id-card"></i>
                                    <span className='mx-2'>
                                        Contact
                                    </span>
                                </NavLink>
                            </li>




                        </ul>
                    </div>
                    <hr className='bg-light' />
                    <div className="row text-center">
                        <div className='dropend col-12'>
                            <button type="button" className="btn btn-danger button-dropend rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-right-from-bracket "></i>
                                <span className='mx-2 text-color-logout'>
                                    Logout
                                </span>
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