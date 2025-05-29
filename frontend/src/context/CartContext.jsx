import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const totalPrice = items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalItems = items.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}