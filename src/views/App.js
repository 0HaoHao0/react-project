import './App.scss';

// 
import Home from './Home/Home';
import Admin from './Admin/Admin';


import {
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from "universal-cookie";
import axios from 'axios';
import { clearUserData } from '../features/user/userSlice';
import Profile from './User/Profile/Profile';


function App() {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const cookies = new Cookies()

  if (cookies.get('JWT') === undefined) {
    dispatch(clearUserData());
  }

  if (cookies.get('JWT') !== null && axios.defaults.headers.common['Authorization'] === undefined) {
    axios.defaults.headers.common['Authorization'] = cookies.get('JWT');
  }

  return (
    < div >
      <ToastContainer />
      {/*  */}
      <Routes  >

        <Route path="/*" element={<Home user={user} />}></Route>
        {
          user.role === "Administrator"
            ?
            <Route path="admin/*" element={<Admin />} />
            :
            null
        }
        {
          user !== null
            ?
            <Route path="profile" element={<Profile user={user} />} />
            :
            null

        }

      </Routes>


    </div>
  );
}

export default App;
