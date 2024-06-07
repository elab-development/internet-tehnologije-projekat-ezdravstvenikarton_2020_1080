import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Početna
          </Link>
        </li>
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
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
              </>
            )}
            {user.role === 'patient' && (
              <li className="navbar-item">
                <Link to="/karton" className="navbar-link">
                  Karton
                </Link>
              </li>
            )}
            <li className="navbar-item">
              <button onClick={handleLogout} className="navbar-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/gallery" className="navbar-link">
                Galerija
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
