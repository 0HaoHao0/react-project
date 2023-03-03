import { Route, Routes } from "react-router-dom";
import "./App.css";

import AdminRouter from "../router/AdminRouter";
import UserRouter from "../router/UserRouter";

import Login from './authentication/Login'
import Register from './authentication/Register';

import PublicRouter from '../router/PublicRouter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Profile from './authentication/Profile';
import ResetPassword from "./authentication/ResetPassword";

function App() {
  axios.defaults.baseURL = "https://localhost:44355/";
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("app_token");

  const user = useSelector((state) => state.user) || {};

  const { role } = user.userInfo || {};

  return (
    <Routes>
      {/* Home Router */}
      <Route path="*" element={<PublicRouter />}></Route>
      {/* Authencation Router */}



      {!role ? (
        <>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </>
      ) : (
        <>
          <Route path="/profile" element={<Profile />}></Route>
        </>
      )
      }
      {/* User Router */}
      {
        role === "Patient" ? (
          <>
            <Route path="/user/*" element={<UserRouter />}></Route>
          </>
        ) : null
      }
      {/* Admin Router */}
      {
        role === "Administrator" ? (
          <>
            <Route path="/admin/*" element={<AdminRouter />}></Route>
          </>
        ) : null
      }
    </Routes >
  );
}

export default App;
