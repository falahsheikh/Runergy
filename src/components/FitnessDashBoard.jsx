import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function FitnessDashBoard() {
  const [calories, setCalories] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [nutritionData, setNutritionData] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [newCalories, setNewCalories] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [newNutrition, setNewNutrition] = useState({ protein: '', carbs: '', fat: '' });

  const calorieChartRef = useRef(null);
  const exerciseChartRef = useRef(null);

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    const currentDate = new Date();
    const pastDays = 30; // Number of past days to show

    const calorieData = Array.from({ length: pastDays }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (pastDays - 1 - i));
      return {
        date: date.toISOString().split('T')[0],
        calories: Math.floor(Math.random() * (2500 - 1500 + 1) + 1500)
      };
    });
    setCalories(calorieData);

    const exerciseData = Array.from({ length: pastDays }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (pastDays - 1 - i));
      return {
        date: date.toISOString().split('T')[0],
        duration: Math.floor(Math.random() * 90)
      };
    });
    setExercises(exerciseData);

    setNutritionData({ protein: 30, carbs: 50, fat: 20 });
  };

  const handleCalorieSubmit = (e) => {
    e.preventDefault();
    const newEntry = { date: new Date().toISOString().split('T')[0], calories: parseInt(newCalories) };
    setCalories([...calories, newEntry]);
    setNewCalories('');
    if (calorieChartRef.current) {
      calorieChartRef.current.scrollLeft = calorieChartRef.current.scrollWidth;
    }
  };

  const handleExerciseSubmit = (e) => {
    e.preventDefault();
    const newEntry = { date: new Date().toISOString().split('T')[0], duration: parseInt(newExercise) };
    setExercises([...exercises, newEntry]);
    setNewExercise('');
    if (exerciseChartRef.current) {
      exerciseChartRef.current.scrollLeft = exerciseChartRef.current.scrollWidth;
    }
  };

  const handleNutritionSubmit = (e) => {
    e.preventDefault();
    const newData = {
      protein: parseInt(newNutrition.protein) || 0,
      carbs: parseInt(newNutrition.carbs) || 0,
      fat: parseInt(newNutrition.fat) || 0
    };
    setNutritionData(newData);
    setNewNutrition({ protein: '', carbs: '', fat: '' });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const calculateAverage = (data, key) => {
    return data.reduce((sum, item) => sum + item[key], 0) / data.length;
  };

  const calorieAverage = calculateAverage(calories, 'calories');
  const exerciseAverage = calculateAverage(exercises, 'duration');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Fitness Dashboard</h1>
      
      <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#444', marginBottom: '20px' }}>Calorie Intake Fluctuation</h2>
        <div ref={calorieChartRef} style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <ResponsiveContainer width={2000} height={300}>
            <LineChart data={calories} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
              <ReferenceLine y={calorieAverage} label="Average" stroke="red" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <form onSubmit={handleCalorieSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
            placeholder="Enter calories"
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Calories</button>
        </form>
      </div>

      <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#444', marginBottom: '20px' }}>Exercise Frequency</h2>
        <div ref={exerciseChartRef} style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <ResponsiveContainer width={2000} height={300}>
            <BarChart data={exercises} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="duration" fill="#82ca9d" />
              <ReferenceLine y={exerciseAverage} label="Average" stroke="red" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <form onSubmit={handleExerciseSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            placeholder="Enter exercise duration"
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Exercise</button>
        </form>
      </div>

      {/* Nutrition section remains unchanged */}
      <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#444', marginBottom: '20px' }}>Nutrition Breakdown</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(nutritionData).map(([key, value]) => ({ name: key, value }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(nutritionData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <form onSubmit={handleNutritionSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <input
            type="number"
            value={newNutrition.protein}
            onChange={(e) => setNewNutrition({...newNutrition, protein: e.target.value})}
            placeholder="Protein %"
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="number"
            value={newNutrition.carbs}
            onChange={(e) => setNewNutrition({...newNutrition, carbs: e.target.value})}
            placeholder="Carbs %"
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="number"
            value={newNutrition.fat}
            onChange={(e) => setNewNutrition({...newNutrition, fat: e.target.value})}
            placeholder="Fat %"
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Update Nutrition</button>
        </form>
      </div>
    </div>
  );
}


