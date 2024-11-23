import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainLayout from './layouts/MainLayout';
import FooterContent from './components/footer/FooterContent';
import './layouts/layout.css';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="app-container">
            <MainLayout />
            <FooterContent />
          </div>
          <ToastContainer />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
