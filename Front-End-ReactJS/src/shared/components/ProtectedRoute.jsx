import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');

  // Nếu không có token hoặc không có thông tin user, redirect về login
  if (!accessToken || !user) {
    // Xóa dữ liệu cũ nếu bị lệch trạng thái
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  // Nếu có token và user, cho phép truy cập
  return element;
}
