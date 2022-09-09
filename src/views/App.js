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



function App() {
  return (
    < div className="">
      <ToastContainer />
      {/*  */}
      <Routes  >
        <Route path="/*" element={<Home />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>


    </div>
  );
}

export default App;
