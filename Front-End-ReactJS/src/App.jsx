import React from 'react'
import { Header } from './shared/components'
import { Routes, Route } from 'react-router-dom'
import Login from './Authentication/login/login'
import Register from './Authentication/Register/register'
import './shared/styles/theme.css'
import './App.css'

function HomePage() {
  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to ResUp</h2>
          <p>Raise Up The Pioneer Power</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Innovation</h3>
          <p>Build amazing projects with cutting-edge technology</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Community</h3>
          <p>Connect with pioneers and like-minded individuals</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Excellence</h3>
          <p>Achieve outstanding results together</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <footer className="footer">
        <p>&copy; 2024 ResUp Club. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
