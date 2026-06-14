import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
  const accessToken = localStorage.getItem('accessToken');

  // Nếu không có token, redirect về login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép truy cập
  return element;
}
