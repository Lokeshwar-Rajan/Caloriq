import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import TDEECalculator from './components/TDEE/TDEECalculator.jsx'
import AuthPage from './components/AuthPage/AuthPage.jsx'
import CalorieDashboard from './components/CalorieDashboard/CalorieDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Caloriq/src/components/TDEE" element={<TDEECalculator />} />
        <Route path="/Caloriq/src/components/AuthPage" element={<AuthPage />} />
        <Route path="/Caloriq/src/components/CalorieDashboard" element={<CalorieDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
