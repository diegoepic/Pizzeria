import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();
export function UserProvider({ children }) {
  const [token, setToken] = useState(true);
  const logout = () => setToken(false);
  return (
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}
