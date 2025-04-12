// src/components/auth/SignUp.jsx
import React, { useState } from 'react';
import './AuthForm.css';

const SignUp = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activity: 'sedentary',
    goal: 'maintain'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp Data:', formData);
    // Here you'll call your backend API
  };

  return (
    <div className='auth-page'>
        <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input name="height" type="number" placeholder="Height (cm)" onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
        <select name="activity" onChange={handleChange}>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly Active</option>
          <option value="moderate">Moderately Active</option>
          <option value="active">Very Active</option>
          <option value="very_active">Super Active</option>
        </select>
        <select name="goal" onChange={handleChange}>
          <option value="maintain">Maintain</option>
          <option value="loss">Lose Weight</option>
          <option value="gain">Gain Muscle</option>
        </select>
        <button type="submit">Create Account</button>
        <p onClick={onSwitch}>Already have an account? Login</p>
      </form>
    </div>
    </div>
    
  );
};

export default SignUp;
