import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useUser();

  useEffect(() => {
    fetch('/cart')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setItems(data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  const totalPrice = items.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  if (loading) return <p>Loading cart...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <table>
          {<table className="cart-table">
  <thead>
    <tr>
      <th>Imagen</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th>Acción</th>
    </tr>
  </thead>
  <tbody>
    {items.map(p => (
      <tr key={p.id}>
        <td>
          <img
            src={p.img}
            alt={p.name}
            style={{ width: 60, borderRadius: 4 }}
          />
        </td>
        <td>{p.name}</td>
        <td>${p.price.toLocaleString()}</td>
        <td>{p.quantity}</td>
        <td>${(p.price * p.quantity).toLocaleString()}</td>
        <td>
          <button
            onClick={() => removeItem(p.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#c00'
            }}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>
        Total:
      </td>
      <td style={{ fontWeight: 'bold' }}>
        ${totalPrice.toLocaleString()}
      </td>
      <td />
    </tr>
  </tfoot>
</table>}
        </table>
      )}
      <button disabled={!token}>Pagar</button>
    </div>
  );
}
