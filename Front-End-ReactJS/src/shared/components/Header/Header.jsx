import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(token && user));
  }, [location]); // Re-run when location/route changes

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const hideHeaderPaths = ['/login', '/register', '/login-success'];
  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => navigate('/')}>
          <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="logo" />
          <div className="brand-info">
            <h1 style={{ color: '#ffd700' }}>RESUP</h1>
            <p className="tagline">Raise Up The Pioneer Power</p>
          </div>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/events" className="nav-item">Events</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-item">Dashboard</Link>
              <button onClick={handleLogout} className="btn-login" style={{ textDecoration: 'none', border: 'none' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-item" style={{ textDecoration: 'none' }}>
                Register
              </Link>
              <Link to="/login" className="btn-login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
