import { useState } from 'react';

export const useAuth = () => {
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'administrator' && password === '123') {
      setUserRole('admin');
      return { success: true, role: 'admin' };
    } else if (username === 'user' && password === 'user') {
      setUserRole('user');
      return { success: true, role: 'user' };
    } else {
      return { success: false, message: 'Username atau Password salah!' };
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername('');
    setPassword('');
  };

  return {
    userRole,
    setUserRole,
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    handleLogout
  };
};
