// frontend/src/pages/Profile.jsx

import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { email, fetchProfile, logout, profile, loadingProfile } = useUser();
  const navigate = useNavigate();

  // Si quisiéramos refrescar info al montar:
  useEffect(() => {
    if (email) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [email]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loadingProfile) {
    return <p>Cargando perfil…</p>;
  }

  if (!email) {
    return <p>No estás autenticado.</p>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <p><strong>Email:</strong> {profile?.email || email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
