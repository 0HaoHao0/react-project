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
                    <a href="/" className="text-center link-dark text-decoration-none row">
                        <span> <i className="fa-solid fa-screwdriver-wrench fa-color-admin"></i> </span>   <h5 className='text-color-admin'>Admin Page</h5>
                    </a>
                    <hr />
                    <div className='admin-scroll d-flex'>
                        <ul className="nav " >
                            <li className='col-12 text-center my-1 '>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/">
                                    <div className='d-inline-flex mx-1 my-1 text-color '>
                                    <i className="mx-2 my-1 fa-solid fa-house fa-color"></i>
                                       <span>Home</span> 
                                    </div>
                                </NavLink>
                            </li>
                            <li className='col-12 text-center my-1'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/contact">
                                        <div className='d-inline-flex mx-1 my-1 text-color '>
                                    <i className="mx-2 my-1 fa-solid fa-house fa-color"></i>
                                       <span>Contact</span> 
                                    </div>
                                </NavLink>
                            </li>
                            <li className='col-12 text-center my-1'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/contact">
                                        <div className='d-inline-flex mx-1 my-1 text-color '>
                                    <i className="mx-2 my-1 fa-solid fa-house fa-color"></i>
                                       <span>Contact</span> 
                                    </div>
                                </NavLink>
                            </li>
                            <li className='col-12 text-center my-1'>
                                <NavLink
                                    className={({ isActive }) => isActive ? "btn navlink-active" : "btn navlink-unactive"}
                                    to="/admin/contact">
                                        <div className='d-inline-flex mx-1 my-1 text-color '>
                                    <i className="mx-2 my-1 fa-solid fa-house fa-color"></i>
                                       <span>Contact</span> 
                                    </div>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                    <hr />
                    <div className="row text-center">
                        <div className='dropend col-12'>
                            <button type="button" className="btn btn-danger button-dropend rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-right-from-bracket fa-color-logout"></i>
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