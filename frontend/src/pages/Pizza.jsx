import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/pizzas/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setPizza(data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading pizza...</p>;
  if (error)   return <p>Error: {error}</p>;
  if (!pizza) return <p>Pizza not found</p>;

  return (
    <div className="pizza-detail">
      <h1>{pizza.name}</h1>
      <img src={pizza.img} alt={pizza.name} />
      <p>{pizza.desc}</p>
      <p>Price: ${pizza.price}</p>
    </div>
  );
}