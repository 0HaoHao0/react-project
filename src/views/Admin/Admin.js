import React, { Component } from 'react'

import {
    Routes,
    Route,
} from "react-router-dom";
import Slidebar from './Slidebar/Slidebar';
import AdminHome from './Home/AdminHome';

import '../../styles/views/Admin/AdminStyle.scss'
import AdminContact from './Contact/AdminContact';
import AdminContactDetail from './Contact/AdminContactDetail';
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className='d-flex'>
                    <div className='col-2'>
                        <Slidebar />
                    </div>

                    <div className='col-10'>
                        <Routes>
                            <Route path='/' index element={<AdminHome />} />
                            <Route path="contact" element={<AdminContact />} />
                            <Route path="contact/:id" element={<AdminContactDetail />} />
                        </Routes>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;