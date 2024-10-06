import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import without curly braces
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import MemberDashboard from './MemberDashboard';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('roles');
    setUserRoles([]);
  };

  const handleLogin = async (credentials) => {
    try {
      console.log(`Login Attempt: ${JSON.stringify(credentials)}`);
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Http Error! Status = ${response.status}, Error = ${response.text()}`);
      }

      const data = await response.json();
      console.log(`JWT Token received: ${data.token}`);

      localStorage.setItem('jwt', data.token);
      setIsAuthenticated(true);

      const decodedToken = jwtDecode(data.token); // Correctly decode the JWT
      console.log(`DECODED TOKEN: ${JSON.stringify(decodedToken)}`);

      const userRoles = decodedToken.roles || []; // Ensure roles are an array
      console.log(`User Roles: ${userRoles}`);

      // Store roles in localStorage as a JSON string
      localStorage.setItem('roles', JSON.stringify(userRoles));
      setUserRoles(userRoles);

      alert('Login Success!');
    } catch (error) {
      console.error(`Login Failed: ${error}`);
      setIsAuthenticated(false);
      alert('Login Failed!');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App">
            <h1>Fitness Tracker</h1>
            <div>
              {Object.keys(localStorage).map((key) => (
                <div key={key}>
                  <h2>{key}: {localStorage.getItem(key)}</h2>
                </div>
              ))}
            </div>
            <ErrorBoundary>
              {!isAuthenticated ? (
                <>
                  <Register />
                  <Login onLogin={handleLogin} />
                </>
              ) : (
                <>
                  <Logout onLogout={handleLogout} />
                  <Routes>
                    {/* Check if userRoles is an array and then apply includes */}
                    <Route path="/admin" element={userRoles.includes('ROLE_ADMIN') ? <AdminDashboard /> : <Navigate to="/" />} />
                    <Route path="/member" element={userRoles.includes('ROLE_MEMBER') ? <MemberDashboard /> : <Navigate to="/" />} />
                  </Routes>
                </>
              )}
            </ErrorBoundary>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
