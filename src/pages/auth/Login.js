import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // Handle errors
  const navigate = useNavigate();  // For redirection

  const handleSubmit = async (event) => {
    console.log(`From Login.js :: handleSubmit called`);
    event.preventDefault();

    if (!memberName || !password) {
      console.log('From Login.js :: handleSubmit failed - missing memberName or password');
      setError('Please fill in all fields.');
      return;
    }

    // Call onLogin from App.js to process login
    console.log(`From Login.js :: onLogin invoked with memberName=${memberName}, password=${password}`);
    await onLogin({ memberName, password });

    // Redirect after login based on the updated state (roles will already be in state)
    const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
    console.log(`From Login.js :: Redirecting based on roles ${JSON.stringify(userRoles)}`);
    if (userRoles.includes('ROLE_ADMIN')) {
      navigate('/boards/admin');
    } else if (userRoles.includes('ROLE_MEMBER')) {
      navigate('/boards/members');
    } else {
      navigate('/');
    }

    console.log('From Login.js :: handleSubmit finished');
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
                    autoComplete="off"
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
                    autoComplete="off"
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
