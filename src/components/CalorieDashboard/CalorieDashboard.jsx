import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './CalorieDashboard.css';

const exercises = [
  { name: 'Running (30 min)', calories: 300 },
  { name: 'Cycling (30 min)', calories: 250 },
  { name: 'Yoga (1 hour)', calories: 200 },
  { name: 'Walking (30 min)', calories: 150 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const CalorieDashboard = () => {
  const [name, setName] = useState('User');
  const [dailyData, setDailyData] = useState({ consumed: 0, burned: 0, remaining: 0 });
  const [macros, setMacros] = useState({ carbs: 0, proteins: 0, fats: 0 });
  const [mealInput, setMealInput] = useState('');
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [tdee, setTdee] = useState(2200);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString());
  const [showPieChart, setShowPieChart] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) setName(savedName);

    const storedTdeeData = JSON.parse(localStorage.getItem('tdeeHistory')) || [];
    if (storedTdeeData.length > 0) {
      const lastEntry = storedTdeeData[storedTdeeData.length - 1];
      setTdee(parseFloat(lastEntry.tdee));
    }

    const progress = JSON.parse(localStorage.getItem('weeklyProgress')) || [];
    const todayEntry = progress.find((entry) => entry.date === selectedDay);
    if (todayEntry) {
      setWeeklyProgress(progress);
      setDailyData({
        consumed: todayEntry.consumed,
        burned: todayEntry.burned,
        remaining: tdee - todayEntry.consumed + todayEntry.burned
      });
      setMacros(todayEntry.macros);
    } else {
      const updatedProgress = [...progress, {
        date: selectedDay,
        day: new Date(selectedDay).toLocaleDateString('en-US', { weekday: 'short' }),
        calories: 0,
        consumed: 0,
        burned: 0,
        macros: { carbs: 0, proteins: 0, fats: 0 }
      }];
      setWeeklyProgress(updatedProgress);
      localStorage.setItem('weeklyProgress', JSON.stringify(updatedProgress));
    }
  }, [selectedDay]);

  const handleMealAdd = async () => {
    const meal = mealInput.trim();
    if (!meal) return;

    try {
      const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(meal)}&search_simple=1&action=process&json=1`;
      const response = await axios.get(searchUrl);
      const products = response.data.products;

      if (!products || products.length === 0) {
        alert("No nutrition data found. Try a more specific meal name.");
        return;
      }

      const food = products[0];
      const nutriments = food.nutriments || {};

      const calories = Math.round(nutriments["energy-kcal"] || 0);
      const carbs = Math.round(nutriments.carbohydrates || 0);
      const proteins = Math.round(nutriments.proteins || 0);
      const fats = Math.round(nutriments.fat || 0);

      const newConsumed = dailyData.consumed + calories;
      const newMacros = {
        carbs: macros.carbs + carbs,
        proteins: macros.proteins + proteins,
        fats: macros.fats + fats
      };

      const updatedProgress = weeklyProgress.map((entry) => {
        if (entry.date === selectedDay) {
          return {
            ...entry,
            consumed: newConsumed,
            calories: newConsumed,
            macros: newMacros
          };
        }
        return entry;
      });

      setDailyData({
        consumed: newConsumed,
        burned: dailyData.burned,
        remaining: tdee - newConsumed + dailyData.burned
      });
      setMacros(newMacros);
      setWeeklyProgress(updatedProgress);
      localStorage.setItem('weeklyProgress', JSON.stringify(updatedProgress));
      setMealInput('');
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      alert('Failed to fetch calorie data. Please try again later.');
    }
  };

  const handleExerciseAdd = () => {
    const exercise = exercises.find(e => e.name === selectedExercise);
    if (!exercise) return;

    const newBurned = dailyData.burned + exercise.calories;
    const updatedProgress = weeklyProgress.map((entry) => {
      if (entry.date === selectedDay) {
        return { ...entry, burned: newBurned };
      }
      return entry;
    });

    setDailyData({
      consumed: dailyData.consumed,
      burned: newBurned,
      remaining: tdee - dailyData.consumed + newBurned
    });
    setWeeklyProgress(updatedProgress);
    localStorage.setItem('weeklyProgress', JSON.stringify(updatedProgress));
  };

  const handleReset = () => {
    const updatedProgress = weeklyProgress.map((entry) => {
      if (entry.date === selectedDay) {
        return {
          ...entry,
          consumed: 0,
          burned: 0,
          calories: 0,
          macros: { carbs: 0, proteins: 0, fats: 0 }
        };
      }
      return entry;
    });

    setDailyData({ consumed: 0, burned: 0, remaining: tdee });
    setMacros({ carbs: 0, proteins: 0, fats: 0 });
    setWeeklyProgress(updatedProgress);
    localStorage.setItem('weeklyProgress', JSON.stringify(updatedProgress));
  };

  const macroData = [
    { name: 'Carbs', value: macros.carbs },
    { name: 'Proteins', value: macros.proteins },
    { name: 'Fats', value: macros.fats }
  ];

  return (
    <div className="dashboard">
      <h1 className="greeting">Welcome back, {name}! 👋</h1>

      <div className="overview">
        <h2>Daily Overview</h2>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {[...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const date = d.toLocaleDateString();
            return <option key={i} value={date}>{date}</option>;
          })}
        </select>
        <div className="overview-cards">
          <div className="card">Calories Consumed: {dailyData.consumed} kcal</div>
          <div className="card">Calories Burned: {dailyData.burned} kcal</div>
          <div className="card">Calories Remaining: {dailyData.remaining} kcal</div>
        </div>
      </div>

      <div className="macros">
        <h2>Macro Breakdown</h2>
        <div className="macro-grid">
          <div className="macro">Carbs: {macros.carbs} g</div>
          <div className="macro">Proteins: {macros.proteins} g</div>
          <div className="macro">Fats: {macros.fats} g</div>
        </div>
        <button onClick={() => setShowPieChart(!showPieChart)}>Toggle Macro Pie Chart</button>
        {showPieChart && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="actions">
        <h2>Quick Actions</h2>
        <input
          type="text"
          placeholder="Enter Meal Description"
          value={mealInput}
          onChange={(e) => setMealInput(e.target.value)}
        />
        <button onClick={handleMealAdd}>Add Meal</button>

        <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
          <option value="">Select Exercise</option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise.name}>{exercise.name}</option>
          ))}
        </select>
        <button onClick={handleExerciseAdd}>Log Exercise</button>
        <button onClick={handleReset}>Reset Day</button>
      </div>

      <div className="charts">
        <h2>Progress Charts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={weeklyProgress}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#212EA0" name="Calories" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalorieDashboard;
