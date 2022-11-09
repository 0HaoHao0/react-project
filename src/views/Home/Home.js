import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Aboutus from '../Aboutus/Aboutus';
import Faq from '../FAQ/Faq';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Service from '../User/Service/Service';
import Main from './Main';
import SetAppointment from '../User/Appointment/SetAppointment';
import ManageAppointment from '../Appointment/ManageAppointment';
import RecFaq from '../FAQ/RecFaq';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Header />
                <Routes>

                    <Route path="*" element={<Main user={this.props.user} />} />
                    {this.props.user.id === null || this.props.user.role === "Administrator"
                        ?
                        <>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </>
                        :
                        <>

                        </>

                    }
                    <Route path="appointment/create" element={<SetAppointment />} />
                    <Route path="appointment" element={<ManageAppointment user={this.props.user} />} />
                    <Route path="service" element={<Service user={this.props.user} />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="aboutus" element={<Aboutus />} />
                    <Route path="faq" element={this.props.user.role === "Receptionist" ? <RecFaq /> : this.props.user.role === "Patient" ? <Faq /> : null} />
                </Routes>
                <Footer />
            </>

        );
    }
}



export default Home;