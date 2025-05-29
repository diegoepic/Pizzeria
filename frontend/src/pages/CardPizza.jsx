import React from 'react';
import { Link } from 'react-router-dom';

export default function CardPizza({ pizza }) {
  return (
    <div className="pizza-card">
      <Link to={`/pizza/${pizza.id}`}>
        <img src={pizza.img} alt={pizza.name} className="pizza-image" />
        <h3>{pizza.name}</h3>
        <p>${pizza.price.toLocaleString()}</p>
      </Link>
    </div>
  );
}