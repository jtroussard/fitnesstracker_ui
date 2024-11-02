import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/home/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes'; // Manages both member and admin dashboards
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/boards/*" element={<DashboardRoutes />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
