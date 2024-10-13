import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MemberDashboard from './pages/dashboard/MemberDashboard';
import LandingPage from './pages/landing/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/member" element={<MemberDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
