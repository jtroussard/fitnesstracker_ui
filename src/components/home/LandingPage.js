import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const LandingPage = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="text-center my-4">
        <h1>Fitness Journal</h1>
      </header>

      {/* Main Content */}
      <main>
        {/* Welcome Section */}
        <section className="mb-5 text-center">
          <h2>Welcome to Fitness Journal</h2>
          <p>Your personal fitness tracking tool. Log your activities and nutrition to stay on top of your fitness goals.</p>
        </section>

        {/* Featured Section */}
        <section className="mb-5 text-center">
          <h2>Track Your Progress</h2>
          <p>Start logging your fitness and nutrition goals today!</p>
        </section>

        {/* Activity and Nutrition Section */}
        <section className="row text-center">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Track Activity</h3>
                <p>Log your workouts and physical activities.</p>
                <a href="/track-activity" className="btn btn-primary">
                  Start Tracking Activity
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Track Nutrition</h3>
                <p>Record your daily meals and nutrition intake.</p>
                <a href="/track-nutrition" className="btn btn-primary">
                  Start Tracking Nutrition
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center mt-5">
        <p>Contact us at support@fitnessjournal.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
