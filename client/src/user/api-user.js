const API = 'http://localhost:3000';

export const list = async (token) => {
  const res = await fetch(`${API}/api/users`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
};
