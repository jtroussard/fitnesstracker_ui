import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainLayout from './layouts/MainLayout';
import FooterContent from './components/footer/FooterContent';
import './layouts/layout.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <MainLayout />
          <FooterContent /> {/* Global footer here */}
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
