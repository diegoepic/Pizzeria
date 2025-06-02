// frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import Pizza    from './pages/Pizza';
import Register from './pages/Register';
import Login    from './pages/Login';
import Profile  from './pages/Profile';
import Cart     from './pages/Cart';
import NotFound from './pages/NotFound';
import { useUser } from './context/UserContext';

export default function App() {
  const { token } = useUser();

  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />

          {/* Si no está autenticado, mostrar Register; si ya lo está, redirigir a Profile */}
          <Route
            path="/register"
            element={token ? <Navigate to="/profile" /> : <Register />}
          />

          {/* Si no está autenticado, mostrar Login; si ya lo está, redirigir a Profile */}
          <Route
            path="/login"
            element={token ? <Navigate to="/profile" /> : <Login />}
          />

          {/* Solo si token existe mostramos Profile; si no, redirigimos a Login */}
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Carrito siempre accesible */}
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
