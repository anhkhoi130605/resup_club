const BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7176';

// HELPER FUNCTION: Thêm Authorization header với token
function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}



