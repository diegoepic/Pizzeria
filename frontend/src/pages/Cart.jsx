import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeItem, totalPrice } = useCart()

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>

      {items.length === 0 ? (
        <p>No hay items en tu carrito.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Pizza</th>
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
              <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total:
              </td>
              <td style={{ fontWeight: 'bold' }}>
                ${totalPrice.toLocaleString()}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  )
}