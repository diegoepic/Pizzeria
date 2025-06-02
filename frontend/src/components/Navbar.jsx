// frontend/src/components/Navbar.jsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext'; // si ves total en el navbar

const Navbar = () => {
  const { token, logout } = useUser();
  const { totalItems } = useCart(); // para mostrar conteo en carrito
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', padding: '1rem', color: '#fff' }}>
      <NavLink to="/"   style={{ marginRight: 15, color: '#fff' }}>Inicio</NavLink>
      {token
        ? (
          <>
            <NavLink to="/profile" style={{ marginRight: 15, color: '#fff' }}>Perfil</NavLink>
            <button onClick={handleLogout} style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              marginRight: 15
            }}>
              Logout
            </button>
          </>
        )
        : (
          <>
            <NavLink to="/register" style={{ marginRight: 15, color: '#fff' }}>Registro</NavLink>
            <NavLink to="/login" style={{ marginRight: 15, color: '#fff' }}>Login</NavLink>
          </>
        )
      }
      <NavLink to="/cart" style={{ color: '#fff' }}>
        🛒 Carrito ({totalItems})
      </NavLink>
    </nav>
  );
};

export default Navbar;
