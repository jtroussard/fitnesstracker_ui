import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainLayout from './components/layouts/MainLayout';
import './components/layouts/layout.css';
import FooterContent from './components/footer/FooterContent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary >
          <div className="app-container">
            <MainLayout />
            <FooterContent />
          </div>
          <ToastContainer />
          </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
