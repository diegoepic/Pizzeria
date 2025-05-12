import React, { useState, useEffect } from 'react';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/pizzas')
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta de la API');
        return res.json();
      })
      .then(data => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando pizzas...</p>;
  if (error) return <p>Error al cargar pizzas: {error.message}</p>;

  return (
    <div className="pizza-list">
      {pizzas.map(pizza => (
        <div key={pizza.id} className="pizza-card">
          <img src={pizza.image} alt={pizza.name} />
          <h2>{pizza.name}</h2>
          <p>Precio: ${pizza.price}</p>
          <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
