import React from 'react';

const Header = () => {
  return (
    <div className="position-relative text-white" style={{ height: '400px' }}>
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
      </div>
      <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="display-4 fw-bold mb-3">¡Pizzería Mamma Mia!</h1>
        <p className="fs-4">¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </div>
  );
};

export default Header;