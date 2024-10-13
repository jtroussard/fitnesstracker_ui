import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Correctly use useNavigate
import { AuthContext } from '../../context/AuthContext';  // Import AuthContext

const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // Handle errors
  const { handleLogin } = useContext(AuthContext);  // Use AuthContext
  const navigate = useNavigate();  // For redirection

  const handleSubmit = async (event) => {
    console.log(`From Login.js :: handleSubmit called with ${event.type}`);
    event.preventDefault();

    if (!memberName || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginSuccess = await handleLogin({ memberName, password });

    if (loginSuccess) {
      const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
      if (userRoles.includes('ROLE_ADMIN')) {
        navigate('/boards/admin');
      } else if (userRoles.includes('ROLE_MEMBER')) {
        navigate('/boards/members');
      } else {
        navigate('/');
      }
    } else {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <div className="card-header text-center">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="login-memberName" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="login-memberName"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
