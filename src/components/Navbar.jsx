import React from 'react';
import { ShoppingCart, Home, LogOut, LogIn, UserCircle2, UserPlus } from 'lucide-react';

const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
};

const Navbar = () => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-nav me-auto">
          <button className="btn btn-link nav-link d-flex align-items-center gap-2">
            <Home size={20} />
            <span>Home</span>
          </button>
        </div>

        <div className="navbar-nav ms-auto d-flex align-items-center gap-3">
          {token ? (
            <>
              <button className="btn btn-link nav-link d-flex align-items-center gap-2">
                <UserCircle2 size={20} />
                <span>Profile</span>
              </button>
              <button className="btn btn-link nav-link d-flex align-items-center gap-2">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-link nav-link d-flex align-items-center gap-2">
                <LogIn size={20} />
                <span>Login</span>
              </button>
              <button className="btn btn-link nav-link d-flex align-items-center gap-2">
                <UserPlus size={20} />
                <span>Register</span>
              </button>
            </>
          )}
          <button className="btn btn-success d-flex align-items-center gap-2">
            <ShoppingCart size={20} />
            <span>Total: {formatPrice(total)}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;