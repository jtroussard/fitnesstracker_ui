import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/boards/*" element={<DashboardRoutes />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
