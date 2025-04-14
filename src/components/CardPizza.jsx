import React from 'react';
import { Eye, ShoppingCart } from 'lucide-react';

const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
};

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <div className="card h-100">
      <img src={img} alt={name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h3 className="card-title h5 fw-bold">{name}</h3>
        <div className="mb-3">
          <h4 className="h6 fw-bold">Ingredientes:</h4>
          <ul className="list-unstyled">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-capitalize">
                • {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <p className="h4 fw-bold text-success mb-3">{formatPrice(price)}</p>
        <div className="d-flex gap-2">
          <button className="btn btn-info text-white flex-grow-1 d-flex align-items-center justify-content-center gap-2">
            <Eye size={20} />
            <span>Ver Más</span>
          </button>
          <button className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2">
            <ShoppingCart size={20} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;