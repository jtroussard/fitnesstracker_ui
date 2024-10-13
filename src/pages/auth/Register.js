// redirect to login after successful registeration
import React, { useState } from 'react';

const Register = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const memberData = {
      memberName,
      password,
      email,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Member registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed, please try again.');
    }
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
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
