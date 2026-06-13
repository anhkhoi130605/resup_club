import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="logo" />
          <div className="brand-info">
            <h1>RESUP</h1>
            <p className="tagline">Raise Up The Pioneer Power</p>
          </div>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/events" className="nav-item">Events</Link>
            <Link to="/dashboard" className="nav-item">Dashboard</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
            <Link to="/register" className="nav-item" style={{ textDecoration: 'none' }}>
              Register
            </Link>
            <Link to="/login" className="btn-login" style={{ textDecoration: 'none' }}>
              Login
            </Link>
        </nav>
      </div>
    </header>
  );
}
