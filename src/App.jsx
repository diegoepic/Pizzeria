import React from 'react';
import { Link } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from "./components/cart";

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />
      <Cart />
      <Footer />
    </div>
  );
};

export default App;