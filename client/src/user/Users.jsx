import { useEffect, useState } from 'react';
import { list } from './api-user';
import auth from '../auth/auth-helper';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    list(jwt?.token).then(data => {
      if (!data?.error) setUsers(data);
    });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
