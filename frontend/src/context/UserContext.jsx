// frontend/src/context/UserContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  // 1. login
  const login = async (emailInput, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('email', data.email);
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Error en login' };
    }
  };

  // 1. register
  const register = async (emailInput, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('email', data.email);
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Error en registro' };
    }
  };

  // 2. logout
  const logout = () => {
    setToken('');
    setEmail('');
    setProfile(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
  };

  // 3. fetchProfile
  const fetchProfile = async () => {
    if (!token) return null;
    setLoadingProfile(true);
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      }
    });
    const data = await res.json();
    setLoadingProfile(false);
    if (res.ok) {
      setProfile(data);
      return { success: true, data };
    } else {
      // token inválido → cierra sesión
      logout();
      return { success: false, message: data.message || 'No autorizado' };
    }
  };

  // Si recargamos la página con token en localStorage, obtenemos el perfil
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{
      token,
      email,
      profile,
      loadingProfile,
      login,
      register,
      logout,
      fetchProfile
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
