import './App.scss';

// 
import Home from './Home/Home';
import Admin from './Admin/Main/Admin';


import {
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Profile from './User/Profile/Profile';



function App() {

  const user = useSelector((state) => state.user);

  return (
    < div >
      <ToastContainer />
      {/*  */}
      <Routes  >

        <Route path="/*" element={<Home user={user} />}></Route>

        {
          user.id !== null
            ?
            <Route path="profile" element={<Profile user={user} />} />
            :
            null
        }

        {
          user.role === "Administrator"
            ?
            <Route path="admin/*" element={<Admin />} />
            :
            null
        }

      </Routes>


    </div>
  );
}

export default App;
