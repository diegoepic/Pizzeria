// frontend/src/pages/Cart.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const {
    items,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    checkout
  } = useCart();

  const [loading, setLoading]    = useState(false);
  const [successMsg, setSuccess] = useState('');
  const [errorMsg, setError]     = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const { ok, data } = await checkout();
    setLoading(false);

    if (ok) {
      setSuccess('¡Compra realizada con éxito!');
      clearCart();
      // Si quieres redirigir luego de la compra, descomenta la siguiente línea:
      // navigate('/');
    } else {
      setError(data.message || 'Error al procesar el pago');
    }
  };

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>

      {items.length === 0 ? (
        <p>No hay artículos en tu carrito.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Pizza</th>
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
                <td></td>
              </tr>
            </tfoot>
          </table>

          {/* Botón de checkout */}
          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: items.length === 0 ? 'not-allowed' : 'pointer',
              opacity: items.length === 0 ? 0.6 : 1
            }}
          >
            {loading ? 'Procesando…' : 'Pagar'}
          </button>

          {successMsg && <p className="success">{successMsg}</p>}
          {errorMsg && <p className="error">{errorMsg}</p>}
        </>
      )}
    </div>
  );
}
