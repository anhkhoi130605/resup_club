export function saveAccessToken(token) {
  if (!token) return;
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function clearAccessToken() {
  localStorage.removeItem('accessToken');
}
