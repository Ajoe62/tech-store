import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user authentication on load
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth/profile'
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    setUser(response.data);
    if (response.data.role) {
      localStorage.setItem('role', response.data.role);
    }
    localStorage.setItem('user', JSON.stringify(response.data));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
