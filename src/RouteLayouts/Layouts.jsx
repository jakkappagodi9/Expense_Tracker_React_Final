import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function Layouts() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layouts;
