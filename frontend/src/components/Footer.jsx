import React from 'react';

const Footer = () => (
  <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', color: '#777' }}>
    &copy; {new Date().getFullYear()} Pizzería Mamma Mía
  </footer>
);

export default Footer;