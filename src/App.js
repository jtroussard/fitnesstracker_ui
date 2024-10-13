import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/common/Navbar';

function App() {
  const [userRoles, setUserRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));

  // On mount, load roles from localStorage if a JWT exists
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setUserRoles(storedRoles);
  }, []);

  // Centralized login handler
  const handleLogin = async (credentials) => {
    console.log(`From App.js :: handleLogin invoked with ${JSON.stringify(credentials)}`);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];

      // Update localStorage and state
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('roles', JSON.stringify(userRoles));
      setUserRoles(userRoles);
      setIsAuthenticated(true);

      console.log(`From App.js :: Login Success, roles set to ${JSON.stringify(userRoles)}`);
    } catch (error) {
      console.error('From App.js :: Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  // Centralized logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) throw new Error('Logout failed');

      // Clear both state and localStorage
      localStorage.removeItem('jwt');
      localStorage.removeItem('roles');
      setUserRoles([]);
      setIsAuthenticated(false);

      console.log('From App.js :: Logout success');
    } catch (error) {
      console.error('From App.js :: Logout failed:', error);
    }
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRoutes onLogin={handleLogin} />} />
        <Route path="/boards/*" element={<DashboardRoutes onLogout={handleLogout} />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
