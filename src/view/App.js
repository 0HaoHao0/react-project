import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRouter from './router/AdminRouter';
import { ErrorPage } from './Error';
import UserRouter from './router/UserRouter';

import Login from './authentication/Login'
import Register from './authentication/Register';

import Home from './Home';

function App() {
  return (
    <Routes>
      {/* Home Router */}
      <Route path='/home' element={<Home />}></Route>
      {/* Authencation Router */}
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      {/* User Router */}
      <Route path='/user' element={<UserRouter />}></Route>
      {/* Admin Router */}
      <Route path='/admin' element={<AdminRouter />}></Route>
      {/* Not Found */}
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
