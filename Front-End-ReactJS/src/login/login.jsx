import React from 'react';
import './login.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-card">
          <div className="login-brand">
            <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="login-logo" />
            <div>
              <h1>ResUp Login</h1>
              <p>Raise Up The Pioneer Power</p>
            </div>
          </div>

          <form className="login-form">
            <label>
              Email
              <input type="email" placeholder="name@resup.com" />
            </label>

            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>

            <div className="login-actions">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-submit">
              Sign in
            </button>
          </form>

          <div className="login-footer">
            <span>New to ResUp?</span>
            <a href="#" className="signup-link">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
