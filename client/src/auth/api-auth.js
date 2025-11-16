const API = 'http://localhost:3000';

export const signin = async (credentials) => {
  const res = await fetch(`${API}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const signout = async () => {
  const res = await fetch(`${API}/auth/signout`, { method: 'GET' });
  return res.json();
};
