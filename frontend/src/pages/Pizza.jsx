import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/pizzas/${id}`)
      .then(r => r.json())
      .then(setPizza)
      .catch(console.error);
  }, [id]);

  if (!pizza) return <p>Cargando...</p>;
  return (
    <div className="pizza-detail">
      <h1>{pizza.name}</h1>
      <img src={pizza.img} alt={pizza.name} />
      <p>{pizza.desc}</p>
      <p>Precio: ${pizza.price}</p>
      <button onClick={() => addItem(pizza)}>Añadir al carrito</button>
    </div>
  );
}