const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5191';

export async function getHello() {
  try {
    const response = await fetch(`${BASE_URL}/api/hello`, { method: 'GET' });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    return {
      message:
        'Không tìm thấy endpoint /api/hello. Hãy kiểm tra backend hoặc đổi sang endpoint API phù hợp.',
    };
  }
}
