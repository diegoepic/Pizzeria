import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ background: '#333', padding: '1rem' }}>
    <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink>
    <NavLink to="/register" className={({isActive}) => isActive ? 'active' : ''}>Registro</NavLink>
    <NavLink to="/login" className={({isActive}) => isActive ? 'active' : ''}>Login</NavLink>
    <NavLink to="/profile" className={({isActive}) => isActive ? 'active' : ''}>Perfil</NavLink>
    <NavLink to="/cart" className={({isActive}) => isActive ? 'active' : ''}>🛒 Carrito</NavLink>
  </nav>
);

export default Navbar;