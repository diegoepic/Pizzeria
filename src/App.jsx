import React from 'react';
import { Link } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from "./components/cart";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">

      <Navbar />
      <Home />
      <Cart />  
      <Footer />
    </div>
  );
};

export default App;