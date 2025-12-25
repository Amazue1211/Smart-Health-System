import React, { createContext, useContext } from 'react';

export interface User {
  firstName: string;
  secondName: string;
  matricNo: string;
  profileImage: string;
}

const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user: User = {
    firstName: 'Chima',
    secondName: 'Amazue',
    matricNo: '22010306022',
    profileImage: '/assets/john.webp',
  };

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
