import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import { jwtDecode } from 'jwt-decode'; // Correct import

function App() {
  const [userRoles, setUserRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));

  // Load roles from localStorage on mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setUserRoles(storedRoles);
  }, []);

  // Centralized API call for login
  const handleLogin = async (credentials) => {
    console.log(`From App.js :: invoking handleLogin with ${JSON.stringify(credentials)}`)
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
      localStorage.setItem('jwt', data.token);

      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];
      localStorage.setItem('roles', JSON.stringify(userRoles));
      console.log(`From App.js :: stored roles in component state, local storage key "roles" set to |${JSON.stringify(userRoles)}`)

      setUserRoles(userRoles);
      setIsAuthenticated(true);
      console.log(`Login Success ${localStorage.getItem('roles')}, ${isAuthenticated}`)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Centralized API call for logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Pass JWT token for server-side logout
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear the JWT and roles from localStorage
      localStorage.removeItem('jwt');
      localStorage.removeItem('roles');

      // Update authentication state
      setIsAuthenticated(false);
      setUserRoles([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Pass handleLogin to AuthRoutes */}
        <Route path="/auth/*" element={<AuthRoutes onLogin={handleLogin} />} />

        {/* Pass handleLogout to DashboardRoutes */}
        <Route path="/boards/*" element={<DashboardRoutes onLogout={handleLogout} />} />

        {/* Catch-all Route */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
