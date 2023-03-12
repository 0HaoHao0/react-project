import { Route, Routes } from "react-router-dom";
import "./App.scss";

import AdminRouter from "../router/AdminRouter";
import UserRouter from "../router/UserRouter";

import ResetPassword from "./authentication/ResetPassword";
import Login from './authentication/Login'
import Register from './authentication/Register';

import PublicRouter from '../router/PublicRouter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Profile from './authentication/Profile';
import Expert from "./expert/Expert";

function App() {
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
