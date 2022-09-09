import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// 
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from './Main';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true,
        }
    }

    render() {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="main" element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
                <Footer />
            </>

        );
    }
}

export default Home;