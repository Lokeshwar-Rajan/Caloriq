// src/components/auth/Login.jsx
import React, { useState } from 'react';
import './AuthForm.css';

const Login = ({ onSwitch }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login credentials:', credentials);
    // Call backend API to authenticate user
  };

  return (
    <div className='auth-page'>
        <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p onClick={onSwitch}>Don't have an account? Sign Up</p>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
