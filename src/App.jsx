import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;