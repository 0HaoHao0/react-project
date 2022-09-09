import React, { Component } from 'react'

import {
    Routes,
    Route,
} from "react-router-dom";
import Slidebar from '../Slidebar/Slidebar';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <Slidebar />
                <Routes>
                    <Route></Route>
                </Routes>
            </>
        );
    }
}

export default Admin;