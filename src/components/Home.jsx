import React from 'react';
import Header from './Header';
import CardPizza from './CardPizza';
import { pizzas } from '../pizzas';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row g-4">
          {pizzas.map(pizza => (
            <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;