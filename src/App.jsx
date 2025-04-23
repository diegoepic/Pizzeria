import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;