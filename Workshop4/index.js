const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const routes = require('./routes/routes');
const { authenticateToken, generateToken, register } = require('./server/controllers/auth');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Servir archivos estáticos desde la carpeta 'client'
app.use(express.static('client'));

// Rutas de autenticación (SIN protección)
app.post('/auth/register', register);
app.post('/auth/token', generateToken);

// Rutas (prefijo /api) - CON protección de token
app.use('/api', authenticateToken, routes);

// Conexión Mongo
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(' Error MongoDB:', error);
});

database.once('connected', () => {
    console.log(' Database Connected');
});

// Levantar server
app.listen(3001, () => {
    console.log(` Server Started at 3001`);
});
