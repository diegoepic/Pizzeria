// backend/index.js

const express = require('express');
const cors = require('cors');

const pizzas = require('./db/pizzas.json');
const app = express();
const PORT = process.env.PORT || 3000;

// ——————————————————————————————————————————
// 1) CONFIGURACIÓN GENERAL (CORS, JSON, etc.)
// ——————————————————————————————————————————
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());


// ——————————————————————————————————————————
// 2) RUTAS DE PIZZAS
// ——————————————————————————————————————————
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


// ——————————————————————————————————————————
// 3) ALMACENAMIENTO EN MEMORIA PARA USUARIOS Y TOKENS
// ——————————————————————————————————————————

// users: array de objetos { email, password, token }
// tokens: objeto que mapea token → email   (para /api/auth/me)
let users = [];
let tokens = {};


/**
 * Genera un “token” sencillo (en producción usarías JWT firmado)
 */
function generateToken() {
  return Math.random().toString(36).substring(2);
}


// ——————————————————————————————————————————
// 4) RUTAS DE AUTENTICACIÓN (/api/auth/…)
// ——————————————————————————————————————————

/**
 * POST /api/auth/register
 * Recibe { email, password }
 *  - Si falta email o password → 400
 *  - Si contraseña < 6 caracteres → 400
 *  - Si email ya está en users → 409
 *  - Si todo ok: crea usuario en users, genera token, lo guarda en tokens[token] = email
 *    y devuelve { token, email } con código 201.
 */
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
  }
  // Verificar si ya existe el usuario
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ message: 'Este email ya está registrado.' });
  }

  // Crear el usuario en memoria
  const token = generateToken();
  users.push({ email, password, token });
  tokens[token] = email; // mapeamos este token a su email

  // Devolver token y email (será guardado en el frontend)
  return res.status(201).json({ token, email });
});

/**
 * POST /api/auth/login
 * Recibe { email, password }
 *  - Si falta alguno → 400
 *  - Si no existe el usuario o contraseña es incorrecta → 401
 *  - Si coincide: generamos un nuevo token, actualizamos en users y tokens[token]=email,
 *    devolvemos { token, email } con código 200.
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }

  // Buscar usuario
  const userIndex = users.findIndex(u => u.email === email && u.password === password);
  if (userIndex < 0) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  // Generar y asignar nuevo token
  const newToken = generateToken();
  users[userIndex].token = newToken;
  tokens[newToken] = email;

  return res.json({ token: newToken, email });
});

/**
 * GET /api/auth/me
 * 
 * Debe recibir header Authorization: Bearer <token>
 * Si no hay token → 401
 * Si el token no existe en nuestro objeto tokens → 401
 * Si existe, devolvemos { email } del usuario asociado.
 */
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  // “Bearer 7hg5jhg5…”
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'No autorizado (falta token).' });
  }
  if (!tokens[token]) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }

  // Devolver el email que guardamos en tokens[token]
  const email = tokens[token];
  return res.json({ email });
});


// ——————————————————————————————————————————
// 5) RUTAS DE CARRITO
// ——————————————————————————————————————————

let cart = []; // carrito global en memoria (para todos los usuarios)

/**
 * GET /cart
 *  - Devuelve el contenido actual de cart (array de pizzas).
 */
app.get('/cart', (req, res) => {
  res.json(cart);
});

/**
 * POST /cart/add
 *  - Recibe { id } en body
 *  - Busca la pizza por ID en pizzas.json
 *  - Si no existe → 404
 *  - Si existe → la agrega a “cart” (sin manejo de cantidades, la empuja al array)
 *  - Devuelve { success: true, cart }
 */
app.post('/cart/add', (req, res) => {
  const { id } = req.body;
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) {
    return res.status(404).json({ message: 'Pizza no encontrada' });
  }
  cart.push(pizza);
  res.json({ success: true, cart });
});

/**
 * GET /cart/total
 *  - Devuelve { total: N } con la cantidad de elementos en el carrito
 */
app.get('/cart/total', (req, res) => {
  res.json({ total: cart.length });
});

/**
 * DELETE /cart/clear
 *  - Limpia todo el carrito (cart = [])
 */
app.delete('/cart/clear', (req, res) => {
  cart = [];
  res.json({ success: true });
});

/**
 * DELETE /cart/remove/:id
 *  - Elimina todas las ocurrencias de la pizza con ID dado
 *  - Devuelve { success: true, cart }
 */
app.delete('/cart/remove/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(p => p.id !== id);
  res.json({ success: true, cart });
});


// ——————————————————————————————————————————
// 6) LEVANTAR SERVIDOR
// ——————————————————————————————————————————
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
