import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const initialState = { memberName: '', password: '', email: '' };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Member registered successfully!');
      setFormData(initialState);
      navigate('/auth/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed, please try again.');
    }
  };

  const handleClear = () => {
    setFormData(initialState);
  };

  return (
    <div className="container mt-5">
      <div className='card p-2'>
        <div className='card-header'>
          <h2>Register</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="reg-memberName" className="form-label">Member Name</label>
              <input
                autoComplete='off'
                type="text"
                className="form-control"
                id="reg-memberName"
                value={formData.memberName}
                onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reg-password" className="form-label">Password</label>
              <input
                autoComplete='off'
                type="password"
                className="form-control"
                id="reg-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                autoComplete='off'
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
