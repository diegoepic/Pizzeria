import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/pizzas/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setPizza(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando pizza...</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!pizza) return <p>Pizza no encontrada</p>;

  return (
    <div className="pizza-detail">
      <h1>{pizza.name}</h1>
      <img src={pizza.img} alt={pizza.name} />
      <p>{pizza.desc}</p>
      <p>Precio: ${pizza.price.toLocaleString()}</p>
      <button onClick={() => addItem(pizza)}>Añadir al carrito</button>
    </div>
  );
}