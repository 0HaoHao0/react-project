import { Route, Routes } from 'react-router-dom';
import './App.css';

import AdminRouter from '../router/AdminRouter';
import UserRouter from '../router/UserRouter';

import Login from './authentication/Login'
import Register from './authentication/Register';

import PublicRouter from '../router/PublicRouter';


function App() {
  return (
    <Routes>
      {/* Home Router */}
      <Route path='*' element={<PublicRouter />}></Route>
      {/* Authencation Router */}
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      {/* User Router */}
      <Route path='/user' element={<UserRouter />}></Route>
      {/* Admin Router */}
      <Route path='/admin' element={<AdminRouter />}></Route>
    </Routes>
  );
}

export default App;
