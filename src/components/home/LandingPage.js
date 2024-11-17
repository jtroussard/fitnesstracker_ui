import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing-page.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="text-center my-4">
        <h1>Fitness Quest</h1>
      </header>

      {/* Welcome Section */}
      <section className="mb-5 text-center">
        <h2>Welcome to Fitness Quest</h2>
        <p>Your personal fitness tracking tool. Log your activities, monitor nutrition, and stay motivated on your journey.</p>
      </section>

      {/* Brief Description */}
      <section className="mb-5 text-center">
        <h3>What is Fitness Quest?</h3>
        <p>Fitness Quest is designed to help you track your fitness progress, set goals, and maintain a healthy lifestyle.</p>
      </section>

      {/* Core Features Section */}
      <section className="mb-5">
        <h3 className="text-center">Core Features</h3>
        <div className="row text-center">
          <div className="col-md-4">
          <span className="material-icons-outlined feature-icon" >
        pool
      </span>
            <h4>Track Activity</h4>
            <p>Log your workouts and monitor your activity levels over time.</p>
          </div>
          <div className="col-md-4">
          <span className="material-icons-outlined feature-icon" >
        restaurant
      </span>
            <h4>Track Nutrition</h4>
            <p>Record your meals and stay on top of your nutritional intake.</p>
          </div>
          <div className="col-md-4">
          <span className="material-icons-outlined feature-icon" >query_stats</span>
            <h4>Progress Insights</h4>
            <p>Get insights and reports to see how far you've come.</p>
          </div>
        </div>
      </section>

      {/* App Updates / Blog Section */}
      <section className="mb-5">
        <h3 className="text-center">Latest Updates</h3>
        <div className="scrolling-updates bg-light p-3" style={{ height: '200px', overflowY: 'scroll' }}>
          <p>Update 1: New nutrition tracking feature added!</p>
          <p>Update 2: Weekly progress insights are now available.</p>
          <p>Update 3: Dark mode option is here.</p>
          {/* Add more update items as needed */}
        </div>
      </section>

      {/* Sign In / Sign Up Section */}
      <section className="row text-center mb-5">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Sign In</h4>
              <p>Already have an account? Log in to access your journal.</p>
              <Link to="/login" className="btn btn-primary mb-2 d-inline-flex align-items-center justify-content-center"><i className="material-icons me-2">login</i>Sign In</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Register</h4>
              <p>New here? Create an account and start your fitness journey.</p>
              <Link to="/register" className="btn btn-primary mb-2 d-inline-flex align-items-center justify-content-center"><i className="material-icons me-2">person_add</i>Register</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center mt-5">
        <p>&copy; 2023 Fitness Quest | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
        <p>Contact us at support@fitnessjournal.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
