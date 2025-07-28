import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌐<span className="web">MyWeb</span>
        <span className="link">Link</span>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Products</a>
        <a href="/">About Us</a>
      </div>
    </nav>
  );
}

export default Navbar;
