// src/components/Cart.jsx
import React, { useState } from 'react';
import { pizzaCart as initialCart } from '../pizzas';

const formatPrice = price =>
  price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, delta) => {
    const updated = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter(item => item.quantity > 0);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <small>Cantidad: {item.quantity}</small>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQty(item.id, +1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="fw-bold">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: {formatPrice(total)}</h4>
            <button className="btn btn-primary">Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
