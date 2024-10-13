import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Delegate the login process to App.js via the onLogin prop
    console.log(`Calling onLogin with ${memberName}, ${password}`)
    onLogin({ memberName, password });
  };

  return (
    <div className="container mt-5">
      <div className="card p-2">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body"></div>
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
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
