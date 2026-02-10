import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <span className="greet-container">Welcome to Expense Tracker</span>
        <span className="profile-update">
          Your Profile is incomplete{' '}
          <Link to="update-profile">Complete now</Link>
        </span>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
export default Dashboard;
