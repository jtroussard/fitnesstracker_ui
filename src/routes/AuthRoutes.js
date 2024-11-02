import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthRoutes = ({onLogin}) => (
  <Routes>
    <Route path="/login" element={<Login onLogin={onLogin}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<h2>Page Not Found</h2>} />
  </Routes>
);

export default AuthRoutes;
