import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userString = localStorage.getItem('user') || null;

  useEffect(() => {
    const fetchUser = async () => {
      if (userString) {
        const response = await axios.get(
          'http://localhost:3000/api/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${userString}`,
            },
          }
        );
        setUser(response.data.token);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('user', response.data.token);
    localStorage.setItem('role', response.data.role);
    setUser(response.data.token);
  };

  const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('cart');
    window.location.reload();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
