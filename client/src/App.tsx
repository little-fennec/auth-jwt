import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Users from './Users';

const TOKEN_KEY = 'token';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const isAuthenticated = Boolean(token);

  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {isAuthenticated && <Link to="/users">Users</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/users" element={isAuthenticated ? <Users token={token!} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;