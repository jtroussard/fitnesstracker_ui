// src/components/auth/Login.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    console.log(`From Login.js :: handleSubmit called with ${event.type}`);
    event.preventDefault();

    if (!memberName || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    const result = await handleLogin({ memberName, password });
    if (!result.success) {
      console.log('From Login.js :: Login failed');
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
