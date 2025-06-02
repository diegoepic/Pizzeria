// frontend/src/context/CartContext.jsx

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const addItem = pizza => {
    setItems(prev => {
      const exists = prev.find(p => p.id === pizza.id);
      if (exists) {
        return prev.map(p =>
          p.id === pizza.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  const removeItem = id => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = items.reduce((sum, p) => sum + p.quantity * p.price, 0);

  // 7. checkout
  const checkout = async () => {
    const token = localStorage.getItem('jwt') || '';
    const res = await fetch(`${API_URL}/api/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ cart: items })
    });
    const data = await res.json();
    return { ok: res.ok, data };
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
