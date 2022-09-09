import React, { Component } from 'react'
import "../../../styles/views/Admin/Slidebar/SlidebarStyle.scss"

import Logo from '../../../assets/images/Logo.png'
class Slidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div class="admin-slidebar d-flex flex-column p-3 bg-light" >
                    <a href="/" class="text-center link-dark text-decoration-none">
                        <img className='admin-logo' src={Logo} alt="admin-logo" />
                        <h5>Admin Management</h5>
                    </a>
                    <hr />
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="." class="nav-link active" aria-current="page">
                                <span> <i class="fa-solid fa-house"></i> </span>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="." class="nav-link link-dark">
                                <svg class="bi pe-none me-2" width="16" height="16"></svg>
                                Dashboard
                            </a>
                        </li>

                    </ul>
                    <hr />
                    <div class="btn-group dropend">
                        <button type="button" class="btn btn-light">
                            <span>Welcome TranVanHao</span>
                        </button>
                        <button type="button" class="btn btn-danger rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-power-off"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href=".">Action</a></li>
                            <li><a class="dropdown-item" href=".">Another action</a></li>
                            <li><a class="dropdown-item" href=".">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </>

        );
    }
}

export default Slidebar;