import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetch('/pizzas')
      .then(r => r.json())
      .then(setPizzas)
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="hero-banner">…</section>
      <div className="container">
        <div className="pizza-list">
          {pizzas.map(p => (
            <div className="pizza-card" key={p.id}>
              <img src={p.img} alt={p.name} className="pizza-image" />
              <h3>{p.name}</h3>
              <p>Precio: ${p.price}</p>
              <div className="actions">
                <Link to={`/pizza/${p.id}`} className="btn-detail">Ver más</Link>
                <button className="btn-add" onClick={() => addItem(p)}>
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}