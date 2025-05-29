import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { token, logout } = useUser();
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      {token ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={logout} className="btn-logout">Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
      <NavLink to="/cart">🛒 Cart ({totalItems})</NavLink>
    </nav>
  );
}