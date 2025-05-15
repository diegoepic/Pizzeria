import React from 'react';
import { useParams } from 'react-router-dom';

const Pizza = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Detalle de Pizza {id}</h2>
      <p>Aquí iría la descripción y opciones de la pizza.</p>
    </div>
  );
};

export default Pizza;
