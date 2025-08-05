import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";

interface User {
  user: string;
  token: string;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  username: User | null;
  setUsername: React.Dispatch<React.SetStateAction<User | null>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}


export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  username: null,
  setUsername: () => { },
  showModal: false,
  setShowModal: () => { },
  selectedDate: null,
  setSelectedDate: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // handle local state
  const [username, setUsername] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // handle  token
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsername(JSON.parse(storedUser));
    }
  }, []);

  const isLoggedIn = !!username;

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setUsername, showModal, setShowModal, selectedDate, setSelectedDate }}>
      {children}
    </AuthContext.Provider>
  );
};
