import { Route, Routes } from "react-router-dom";
import "./App.scss";

import AdminRouter from "../router/AdminRouter";
import UserRouter from "../router/UserRouter";

import ResetPassword from "./authentication/ResetPassword";
import Login from './authentication/Login'
import Register from './authentication/Register';

import PublicRouter from '../router/PublicRouter';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './authentication/Profile';
import Expert from "./expert/Expert";
import Cookies from "universal-cookie/cjs/Cookies";
import { deleteUser } from "../redux/features/userSlide";
import DoctorRouter from "../router/DoctorRouter";
import ReceptionistRouter from "../router/ReceptionistRouter";
import TechnicianRouter from "../router/TechnicianRouter";

const cookie = new Cookies();

function App() {
  const dispatch = useDispatch();

  if (!cookie.get('_to')) {
    axios.defaults.headers.common['Authorization'] = "";
    localStorage.clear();
    dispatch(deleteUser())
  }

  axios.defaults.baseURL = "https://localhost:44355/";

  axios.defaults.headers.common["Authorization"] = localStorage.getItem("app_token");

  const user = useSelector((state) => state.user); // user return {} or { userInfo: {...} }

  return (
    <Routes>
      {/* Home Router */}

      <Route path="*" element={<PublicRouter />}></Route>

      {
        user.userInfo === undefined ? (
          <>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="resetpassword" element={<ResetPassword />}></Route>
          </>
        ) : null
      }
      {/* Authencation Router */}
      {
        user.userInfo !== undefined ? (
          <>
            <Route path="/profile" element={<Profile />}></Route>
          </>
        ) : null
      }
      {/* User Router */}
      {
        user.userInfo && (user.userInfo.role === "Patient") ? (
          <>
            <Route path="/user/*" element={<UserRouter />}></Route>
          </>
        ) : null
      }
      {/* Doctor Router */}
      {
        user.userInfo && (user.userInfo.role === "Doctor") ? (
          <>
            <Route path="/doctor/*" element={<DoctorRouter />}></Route>
          </>
        ) : null
      }
      {/* Receptionist Router */}
      {
        user.userInfo && (user.userInfo.role === "Receptionist") ? (
          <>
            <Route path="/receptionist/*" element={<ReceptionistRouter />}></Route>
          </>
        ) : null
      }
      {/* Technician Router */}
      {
        user.userInfo && (user.userInfo.role === "Technician") ? (
          <>
            <Route path="/technician/*" element={<TechnicianRouter />}></Route>
          </>
        ) : null
      }
      {/* Admin Router */}
      {
        user.userInfo && (user.userInfo.role === "Administrator") ? (
          <>
            <Route path="/admin/*" element={<AdminRouter />}></Route>
          </>
        ) : null
      }
      {/* Expert Router */}
      {
        user.userInfo && (user.userInfo.role === "Expert") ? (
          <>
            <Route path="/expert" element={<Expert />}></Route>
          </>
        ) : null
      }
    </Routes >
  );
}

export default App;
