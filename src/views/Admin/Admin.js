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
import AdminRoom from './Room/AdminRoom';
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

                    <div className='col-10 bg-right'>
                        <Routes>
                            <Route path='/' index element={<AdminHome />} />
                            {/* Contact */}
                            <Route path="contact" element={<AdminContact />} />
                            <Route path="contact/:id" element={<AdminContactDetail />} />
                            {/* Room */}
                            <Route path="room" element={<AdminRoom />} />
                        </Routes>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;