import React, { useState, useEffect } from 'react';

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pizzaId = 'p001'; // ID fijo por ahora

  useEffect(() => {
    fetch(`/api/pizzas/${pizzaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener la pizza');
        return res.json();
      })
      .then(data => {
        setPizza(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [pizzaId]);

  if (loading) return <p>Cargando datos de la pizza...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pizza-detail">
      <img src={pizza.image} alt={pizza.name} />
      <h1>{pizza.name}</h1>
      <p>Precio: ${pizza.price}</p>
      <h3>Ingredientes:</h3>
      <ul>
        {pizza.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <p>{pizza.description}</p>
      <button>Añadir al carrito</button>
    </div>
  );
};

export default Pizza;
