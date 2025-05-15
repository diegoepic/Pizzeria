// src/pages/Home.jsx

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('/pizzas')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setPizzas)
      .catch(err => console.error('Error cargando pizzas:', err))
  }, [])

  const addToCart = async (id) => {
    await fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    alert('🍕 Añadida al carrito')
  }

  return (
    <div className="home">
      <header className="hero">
        <h1>¡Pizzería Mamma Mía!</h1>
        <p>Las mejores pizzas que encontrarás en un solo lugar</p>
      </header>
         <section className="hero-banner">
      <div className="hero-content">
         <h1>Pizzería Mamma Mía</h1>
         <p>¡Las mejores pizzas artesanales a un clic de distancia!</p>
       </div>
     </section>

      <section className="pizza-list">
        {pizzas.map(p => (
          <div className="pizza-card" key={p.id}>
            <img
              src={p.img}
              alt={p.name}
              className="pizza-image"
            />
            <div className="pizza-info">
              <h3 className="pizza-name">{p.name}</h3>
              <p className="pizza-price">Precio: ${p.price}</p>
              <div className="pizza-actions">
                <Link to={`/pizza/${p.id}`} className="btn btn-detail">
                  Ver más
                </Link>
                <button
                  className="btn btn-add"
                  onClick={() => addToCart(p.id)}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
