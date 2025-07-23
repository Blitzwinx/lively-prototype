// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

// Shape: { id: number, name: string, avatar: string, ... }
const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // On mount, load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUserState(JSON.parse(stored));
    }
  }, []);

  // Wrap setter to also sync to localStorage
  const setUser = (newUser) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for consuming
export const useUser = () => useContext(UserContext);
