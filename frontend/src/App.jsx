import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
// import Pizza from './components/Pizza';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      {/* <Pizza /> */}
      <Footer />
    </div>
  );
};
export default App;