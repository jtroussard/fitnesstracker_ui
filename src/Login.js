import React, { useState } from "react";


const Login = ({ onLogin }) => {

    const [memberName, setMemberName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin({ memberName, password });
    }

    return (
        <div className="container mt-5">
            <div className="card p-2">
                <div className="card-header">
                    <h2>Login</h2>
                </div>
                <div className="card-body"></div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="memberName" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="memberName"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
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



}

export default Login;