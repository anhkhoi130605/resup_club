import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    const payload = { fullname, studentId, email, password };
    // TODO: call backend register endpoint
    console.log('Register payload:', payload);
  };

  const handleGoogleRegister = () => {
    // Redirect to backend Google OAuth endpoint (backend will handle register/login)
    window.location.href = 'https://localhost:7176/api/auth/login-google';
  };

  return (
    <div className="register-page">
      <div className="register-shell">
        <div className="register-card">
          <div className="register-brand">
            <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="register-logo" />
            <div>
              <h1>Đăng ký ResUp</h1>
              <p>Raise Up The Pioneer Power</p>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Họ và tên
              <input value={fullname} onChange={e => setFullname(e.target.value)} type="text" name="fullname" placeholder="Nguyễn Văn A" required />
            </label>

            <label>
              Mã số sinh viên
              <input value={studentId} onChange={e => setStudentId(e.target.value)} type="text" name="studentId" placeholder="DE190001" required />
            </label>

            <label>
              Email
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="name@resup.com" required />
            </label>

            <label>
              Mật khẩu
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Mật khẩu" required />
            </label>

            <label>
              Xác nhận mật khẩu
              <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" name="confirm" placeholder="Xác nhận mật khẩu" required />
            </label>

            <button type="submit" className="btn btn-submit">Tạo tài khoản</button>
          </form>

          <div className="divider">HOẶC</div>

          <button className="btn-google" type="button" onClick={handleGoogleRegister}>
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.2c0-.63-.06-1.23-.18-1.8H9v3.4h4.84c-.21 1.15-.84 2.12-1.79 2.78v2.3h2.9c1.7-1.57 2.69-3.87 2.69-6.68z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.9-2.3c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.73H1.01v2.34C2.5 15.9 5.54 18 9 18z" fill="#34A853"/>
                <path d="M3.95 10.76A5.41 5.41 0 0 1 3.5 9c0-.62.1-1.22.27-1.76V4.9H1.01a9 9 0 0 0 0 4.1l2.94-2.34z" fill="#FBBC05"/>
                <path d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.96 11.43 0 9 0 5.54 0 2.5 2.1 1.01 4.9l2.94 2.34C4.66 5.17 6.65 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Tiếp tục với Google
          </button>

          <div className="register-footer">
            <span>Đã có tài khoản?</span>
            <Link to="/login" className="login-link">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
