// src/pages/Login/LoginSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveAccessToken } from '../../shared/utils/auth';

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lấy token từ thanh URL (?token=...)
    const token = searchParams.get('token');

    if (token) {
      // 2. Lưu vào localStorage giống như khi Login bằng Form
      saveAccessToken(token);
      console.log('✅ Google Token đã được lưu thành công!');

      // 3. Nhảy thẳng vào trang Dashboard
      navigate('/dashboard');
    } else {
      console.error('❌ Không tìm thấy token từ Google');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>Đang xác thực tài khoản Google, vui lòng đợi...</h2>
    </div>
  );
}