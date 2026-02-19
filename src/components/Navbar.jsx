import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import './Navbar.css';

function Navbar() {
  const { handleSignOut, isLoggedIn, isEmailVerified } =
    useContext(authContext);
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

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'active-link logout-link' : 'link logout-link'
          }
          type="button"
          onClick={handleSignOut}
        >
          {isLoggedIn && isEmailVerified ? 'Logout' : 'Login'}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
