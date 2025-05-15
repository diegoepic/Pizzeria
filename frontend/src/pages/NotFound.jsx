import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h2>Página no encontrada</h2>
    <Link to="/">Volver al inicio</Link>
  </div>
);

export default NotFound;
