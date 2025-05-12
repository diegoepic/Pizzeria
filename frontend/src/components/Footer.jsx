import React from 'react';
import { Pizza } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <Pizza size={24} />
            <span className="h5 mb-0">Pizzería Mamma Mia!</span>
          </div>
          <p className="mb-3">© 2024 - Pizzería Mamma Mia! - Todos los derechos reservados</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#" className="text-white text-decoration-none">Términos y Condiciones</a>
            <a href="#" className="text-white text-decoration-none">Política de Privacidad</a>
            <a href="#" className="text-white text-decoration-none">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;