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
import AdminRoomCreate from './Room/AdminRoomCreate';
import AdminRoomDetail from './Room/AdminRoomDetail';
import AdminRoomUpdate from './Room/AdminRoomUpdate';
import AdminDevice from './Device/AdminDevice';
import AdminDeviceCreate from './Device/AdminDeviceCreate';
import AdminDeviceDetail from './Device/AdminDeviceDetail';
import AdminDeviceUpdate from './Device/AdminDeviceUpdate';
import AdminService from './Service/AdminService';
import AdminServiceCreate from './Service/AdminServiceCreate';
import AdminServiceDetail from './Service/AdminServiceDetail';
import AdminServiceUpdate from './Service/AdminServiceUpdate';
import AdminDocter from './Docter/AdminDocter';
import AdminDocterRequest from './Docter/AdminDocterRequest';
import AdminUser from './User/AdminUser';
import AdminUserUpdate from './User/AdminUserUpdate';
import AdminUserDetail from './User/AdminUserDetail';
import AdminDocterUpdate from './Docter/AdminDocterUpdate';
import AdminDocterDetail from './Docter/AdminDocterDetail';
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
                            <Route path="room/create" element={<AdminRoomCreate />} />
                            <Route path="room/:id" element={<AdminRoomDetail />} />
                            <Route path="room/update/:id" element={<AdminRoomUpdate />} />
                            {/* Device */}
                            <Route path="device" element={<AdminDevice />} />
                            <Route path="device/create" element={<AdminDeviceCreate />} />
                            <Route path="device/:id" element={<AdminDeviceDetail />} />
                            <Route path="device/update/:id" element={<AdminDeviceUpdate />} />
                            {/* Service */}
                            <Route path="service" element={<AdminService />} />
                            <Route path="service/create" element={<AdminServiceCreate />} />
                            <Route path="service/:id" element={<AdminServiceDetail />} />
                            <Route path="service/update/:id" element={<AdminServiceUpdate />} />
                            {/* Docter */}
                            <Route path="docter" element={<AdminDocter />} />
                            <Route path="docter/request" element={<AdminDocterRequest />} />
                            <Route path="docter/:id" element={<AdminDocterDetail />} />
                            <Route path="docter/update/:id" element={<AdminDocterUpdate />} />
                            {/* User */}
                            <Route path="user" element={<AdminUser />} />
                            <Route path="user/:id" element={<AdminUserDetail />} />
                            <Route path="user/update/:id" element={<AdminUserUpdate />} />
                        </Routes>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;