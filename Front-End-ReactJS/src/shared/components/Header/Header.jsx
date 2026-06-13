import React from 'react';
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
          <a href="/" className="nav-item">Home</a>
          <a href="/about" className="nav-item">About</a>
          <a href="/events" className="nav-item">Events</a>
          <a href="/contact" className="nav-item">Contact</a>
          <button className="btn-login">Login</button>
        </nav>
      </div>
    </header>
  );
}
