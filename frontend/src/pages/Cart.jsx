import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, totalPrice } = useCart();
  if (items.length === 0) return <p>Carrito vacío.</p>;
  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      <ul className="cart-list">
        {items.map(p => (
          <li key={p.id}>
            <img src={p.img} alt={p.name} className="cart-img" />
            <span>{p.name} x{p.quantity}</span>
            <span>${p.price * p.quantity}</span>
            <button onClick={() => removeItem(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}