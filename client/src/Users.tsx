import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UsersProps {
  token: string;
}

interface User {
  id: string;
  email: string;
}

const Users: React.FC<UsersProps> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUsers(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch users'));
  }, [token]);

  return (
    <>
      <h2>Users</h2>
      {error && <div>{error}</div>}
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </>
  );
};

export default Users; 