// backend/index.js

const express = require('express');
const cors = require('cors');
const path = require('path');

// Carga de datos
const pizzas = require('./db/pizzas.json');

// Opcional: podrías cargar usuarios/carrito de JSON o BD aquí
// const users = require('./db/users.json');
// const cartData = require('./db/cart.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS: ajusta el puerto al que usa Vite (5173, 5174, etc.)
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

// Para parsear JSON en el body de POST/PUT
app.use(express.json());

// Rutas de pizzas
app.get('/pizzas', (req, res) => {
  res.json(pizzas);
});

app.get('/api/pizzas/:id', (req, res) => {
  const { id } = req.params;
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) {
    return res.status(404).json({ message: 'Pizza no encontrada' });
  }
  res.json(pizza);
});

// Ejemplo de registro (ajusta a tu lógica real)
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  res.json({ success: true, message: 'Usuario registrado' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  res.json({ success: true, message: 'Login correcto' });
 
});


let cart = [];


app.get('/cart', (req, res) => {
  res.json(cart);
});


app.post('/cart/add', (req, res) => {
  const { id } = req.body;
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) {
    return res.status(404).json({ message: 'Pizza no encontrada' });
  }
  cart.push(pizza);
  res.json({ success: true, cart });
});


app.get('/cart/total', (req, res) => {
  res.json({ total: cart.length });
});

app.delete('/cart/clear', (req, res) => {
  cart = [];
  res.json({ success: true });
});

app.delete('/cart/remove/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(p => p.id !== id);
  res.json({ success: true, cart });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
