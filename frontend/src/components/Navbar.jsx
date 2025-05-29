import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems, totalPrice } = useCart();
  return (
    <nav className="navbar">
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/register">Registro</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Perfil</NavLink>
      <NavLink to="/cart">🛒 Carrito ({totalItems}) - ${totalPrice}</NavLink>
    </nav>
  );
};
export default Navbar;