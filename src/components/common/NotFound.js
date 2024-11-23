import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../configs/routes.js';
import './not-found.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <button
        className="not-found-link btn btn-primary"
        onClick={() => navigate(routes.public.find(route => route.name === 'LandingPage').path)}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
