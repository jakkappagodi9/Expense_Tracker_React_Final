import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function Layouts() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layouts;
