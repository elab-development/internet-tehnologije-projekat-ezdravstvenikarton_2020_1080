 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Početna
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/doctors" className="navbar-link">
            Doktori
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/doctors/add" className="navbar-link">
            Dodaj Doktora
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/gallery" className="navbar-link">
            Galerija
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
