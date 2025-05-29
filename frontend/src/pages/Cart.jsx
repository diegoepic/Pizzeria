import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Cart() {
  const { items, removeItem, totalPrice } = useCart();
  const { token } = useUser();

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {items.length === 0 ? (
        <p>No hay items en tu carrito.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id}>
                <td><img src={p.img} alt={p.name} style={{ width:60 }} /></td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>${(p.quantity * p.price).toLocaleString()}</td>
                <td>
                  <button onClick={() => removeItem(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign:'right' }}>Total:</td>
              <td>${totalPrice.toLocaleString()}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      )}
      <button disabled={!token}>Pagar</button>
    </div>
  );
}
