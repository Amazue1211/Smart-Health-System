import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on app load
    const storedUser = localStorage.getItem('healthcare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Mock authentication - replace with API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials:
        // admin@healthcare.com / admin123 -> admin
        // doctor@healthcare.com / doctor123 -> doctor
        // patient@healthcare.com / patient123 -> patient
        if (email === 'admin@healthcare.com' && password === 'admin123') {
          const userData = { id: 1, name: 'Admin User', email, role: 'admin' };
          setUser(userData);
          localStorage.setItem('healthcare_user', JSON.stringify(userData));
          resolve(userData);
        } else if (email === 'doctor@healthcare.com' && password === 'doctor123') {
          const userData = { id: 2, name: 'Dr. Olivia Bennett', email, role: 'doctor' };
          setUser(userData);
          localStorage.setItem('healthcare_user', JSON.stringify(userData));
          resolve(userData);
        } else if (email === 'patient@healthcare.com' && password === 'patient123') {
          const userData = { id: 3, name: 'Eleanor Rodriguez', email, role: 'patient' };
          setUser(userData);
          localStorage.setItem('healthcare_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};