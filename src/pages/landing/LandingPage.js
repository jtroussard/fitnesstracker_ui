import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import Register from '../auth/Register';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar'; // Use the new Navbar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      const userRoles = decodedToken.roles || [];
      setUserRoles(userRoles);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Failed to log in');

      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      const decodedToken = jwtDecode(data.token);
      const userRoles = decodedToken.roles || [];
      localStorage.setItem('roles', JSON.stringify(userRoles));
      setIsAuthenticated(true);
      setUserRoles(userRoles);

      alert('Login Successful!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setUserRoles([]);
  };

  useEffect(() => {
    if (isAuthenticated && userRoles.includes('ROLE_ADMIN')) {
      navigate('/admin');
    } else if (isAuthenticated && userRoles.includes('ROLE_MEMBER')) {
      navigate('/member');
    }
  }, [isAuthenticated, userRoles, navigate]);

  return (
    <div className="container">
      {/* Header Section */}
      <header className="text-center my-4">
        <h1>Fitness Journal</h1>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </header>

      {/* Main Content */}
      <main>
        {/* Auth Section */}
        <div className="mb-5">
          {!isAuthenticated ? (
            <div className="row justify-content-center">
              <div className="col-md-4">
                <Register />
              </div>
              <div className="col-md-4">
                <Login onLogin={handleLogin} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Logout onLogout={handleLogout} />
            </div>
          )}
        </div>

        {/* Featured Section */}
        <section className="mb-5 text-center">
          <h2>Track Your Progress</h2>
          <p>Start logging your fitness and nutrition goals today!</p>
        </section>

        {/* Activity and Nutrition Section */}
        <section className="row text-center">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Track Activity</h3>
                <p>Log your workouts and physical activities.</p>
                <a href="/track-activity" className="btn btn-primary">
                  Start Tracking Activity
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Track Nutrition</h3>
                <p>Record your daily meals and nutrition intake.</p>
                <a href="/track-nutrition" className="btn btn-primary">
                  Start Tracking Nutrition
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center mt-5">
        <p>Contact us at support@fitnessjournal.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
