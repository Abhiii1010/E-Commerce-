import React from 'react';
import './Navbar.css';
import navLogo from "../../assets/nav-logo.svg";
import navProfile from '../../assets/nav-profile.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={navLogo} alt="Logo" className="nav-logo" />
      <img src={navProfile} alt="Profile" className="nav-profile" />
    </nav>
  );
}

export default Navbar;
