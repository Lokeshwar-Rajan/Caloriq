import React, { useState, useEffect } from 'react';
import './TDEECalculator.css';
import { fetchFoodsByGoal } from '../../api/foodAPI';

const TDEECalculator = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activity: 'sedentary'
      });
      

  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [goal, setGoal] = useState('maintain');
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [foods, setFoods] = useState([]);
  const [bmi, setBmi] = useState(null);
  const [bmiLevel, setBmiLevel] = useState('');

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculate = async (e) => {
    e.preventDefault();
    const { age, gender, weight, height, activity } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    let bmrCalc;
    if (gender === 'male') {
      bmrCalc = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrCalc = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdeeCalc = bmrCalc * activityMultipliers[activity];

    setBmr(bmrCalc.toFixed(2));
    setTdee(tdeeCalc.toFixed(2));

    let goal = "maintain";
    if (tdeeCalc < 1800) goal = "loss";
    else if (tdeeCalc > 2500) goal = "gain";
    setGoal(goal);

    const foodSuggestions = await fetchFoodsByGoal(goal);
    setFoods(foodSuggestions);

    const heightInM = h / 100;
    const bmiCalc = w / (heightInM * heightInM);
    setBmi(bmiCalc.toFixed(2));

    let level = '';
    if (bmiCalc < 18.5) level = 'Underweight';
    else if (bmiCalc < 24.9) level = 'Normal weight';
    else if (bmiCalc < 29.9) level = 'Overweight';
    else level = 'Obese';
    setBmiLevel(level);

    const userData = {
        name: formData.name,
        age,
        gender,
        weight,
        height,
        activity,
        bmr: bmrCalc.toFixed(2),
        tdee: tdeeCalc.toFixed(2),
        bmi: bmiCalc.toFixed(2),
        bmiLevel: level,
        goal
      };
      
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('tdeeHistory')) || [];
      existingData.push(userData);
      localStorage.setItem('tdeeHistory', JSON.stringify(existingData));
      

  };

  return (
    <div className="page-background">
      <div className="header">
        <h1>Welcome Back, Fitness Champ! 💪</h1>
      </div>

      <div className="layout">
        <div className="calculator-container">
          <h2>TDEE, BMR & BMI Calculator</h2>
          <form onSubmit={calculate} className="calculator-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              Age:
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </label>
            <label>
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Weight (kg):
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            </label>
            <label>
              Height (cm):
              <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            </label>
            <label>
              Activity Level:
              <select name="activity" value={formData.activity} onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="very_active">Super Active</option>
              </select>
            </label>
            <button type="submit">Calculate</button>
          </form>

          {bmr && tdee && (
            <div className="result">
              <p><strong>BMR:</strong> {bmr} kcal/day</p>
              <p><strong>TDEE:</strong> {tdee} kcal/day</p>
              <p><strong>BMI:</strong> {bmi} ({bmiLevel})</p>
              <p><strong>Level:</strong> {bmiLevel === 'Underweight' ? 'Consider increasing caloric intake' : bmiLevel === 'Normal weight' ? 'Maintain your current lifestyle' : bmiLevel === 'Overweight' ? 'Consider moderate calorie reduction' : 'Consult a healthcare provider'}</p>
            </div>
          )}
        </div>
        <div className="summary-card">
          <h3>Your Goal: {goal === 'loss' ? 'Lose Weight' : goal === 'gain' ? 'Gain Muscle' : 'Maintain Weight'}</h3>
          <p>Suggested daily intake: <strong>{goal === 'loss' ? (tdee * 0.85).toFixed(0) : goal === 'gain' ? (tdee * 1.15).toFixed(0) : tdee} kcal</strong></p>
          <h3>Recommended Foods:</h3>
          <ul className="food-list">
            {foods.map((item, idx) => (
              <li key={idx}>{item.name} — {item.calories} kcal</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TDEECalculator;
