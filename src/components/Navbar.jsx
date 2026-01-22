import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          🌐<span>MyWeb</span>
          <span>Link</span>
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          Home
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          Products
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
        >
          About Us
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
