import React, { useState } from 'react';
import './login.css';
import Toast from '../../shared/components/Toast/Toast';
import { Link, useNavigate } from 'react-router-dom';
import { saveAccessToken } from '../../shared/utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5191';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' });

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/login-google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Bắt đầu login với email:', email);
    
    try {
      console.log('🔗 Gửi request tới:', `${API_BASE_URL}/api/auth/login`);
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      console.log('📊 Response status:', res.status, res.statusText);

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const msg = (err && err.message) || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.';
        console.error('❌ Login failed:', { status: res.status, error: err });
        setToast({ visible: true, message: msg, type: 'error' });
        return;
      }

      // LẤY DỮ LIỆU TỪ RESPONSE
      const data = await res.json();
      console.log('✅ Login response:', data);
      
      // LƯU TOKEN VÀO LOCALSTORAGE (chú ý: key là lowercase từ .NET)
      if (data.accessToken) {
        saveAccessToken(data.accessToken);
        console.log('💾 AccessToken đã lưu vào localStorage');
        console.log('Token length:', data.accessToken.length);
      } else {
        console.warn('⚠️ Không tìm thấy accessToken trong response');
      }
      
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log('💾 RefreshToken đã lưu');
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('💾 User info đã lưu:', data.user.email);
      }

      // Kiểm tra localStorage
      const savedToken = localStorage.getItem('accessToken');
      console.log('🔍 Verify token trong localStorage:', savedToken ? 'Có ✅' : 'Không ❌');

      // on success redirect to dashboard
      console.log('🚀 Đang chuyển hướng tới /dashboard...');
      navigate('/dashboard');
      console.log('✅ Navigate hoàn thành');
    } catch (error) {
      console.error('💥 Lỗi catch:', error);
      setToast({ visible: true, message: 'Không thể kết nối đến máy chủ: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className="login-page">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />

      <div className="login-shell">
        <div className="login-card">
          <div className="login-brand">
            <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="login-logo" />
            <div>
              <h1>ResUp Login</h1>
              <p>Raise Up The Pioneer Power</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="name@resup.com" required />
            </label>

            <label>
              Password
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" required />
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
            <Link to="/register" className="signup-link">Register</Link>
          </div>

          <div className="divider">HOẶC</div>

          <button className="btn-google" onClick={handleGoogleLogin} type="button">
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
        </div>
      </div>
    </div>
  );
}