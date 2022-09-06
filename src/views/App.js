import './App.scss';
import Header from './Header/Header';

import {
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './Login/Login';
import Register from './Register/Register'
import Home from './Home/Home';

function App() {
  return (
    < div className="">
      <Header />
      <ToastContainer />
      {/*  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>


    </div>
  );
}

export default App;
