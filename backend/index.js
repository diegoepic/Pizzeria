import express from 'express';
import cors from 'cors';
import pizzas from './data/pizzas.json' assert { type: 'json' };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());


app.get('/pizzas', (req, res) => res.json(pizzas));


app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));