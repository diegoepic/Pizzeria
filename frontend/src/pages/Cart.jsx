import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // Carga carrito
  const loadCart = () => {
    setLoading(true);
    fetch('/cart')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Vaciar todo
  const clearCart = async () => {
    await fetch('/cart/clear', { method: 'DELETE' });
    loadCart();
  };

  // Eliminar un ítem completo (por ID)
  const removeOne = async (id) => {
    await fetch(`/cart/remove/${id}`, { method: 'DELETE' });
    loadCart();
  };

  const totalPrice = items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  if (loading) return <p>Cargando carrito…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>
      {items.length === 0 ? (
        <p>No hay items en tu carrito.</p>
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
                  <td>${p.price}</td>
                  <td>{p.quantity || 1}</td>
                  <td>${(p.price * (p.quantity || 1)).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => removeOne(p.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c00' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  Total:
                </td>
                <td style={{ fontWeight: 'bold' }}>
                  ${totalPrice.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
          <button
            onClick={clearCart}
            style={{
              marginTop: '1rem',
              padding: '.5rem 1rem',
              background: '#c00',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
