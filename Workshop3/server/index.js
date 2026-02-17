const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// Configuración de conexión a MongoDB
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const database = mongoose.connection;

database.on('error', (error) => {
  console.log('Error MongoDB:', error);
});

database.once('connected', () => {
  console.log('Base de datos conectada');
});

// Importar controladores
const {
  courseGet,
  courseGetOne,
  coursePost,
  coursePatch,
  coursePut,
  courseDelete
} = require("./controllers/courseController.js");

// Middleware para parsear JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Configuración de CORS
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Rutas de la API
app.get("/api/courses", courseGet);
app.get("/api/courses/:id", courseGetOne);
app.post("/api/courses", coursePost);
app.patch("/api/courses/:id", coursePatch);
app.put("/api/courses/:id", coursePut);
app.delete("/api/courses/:id", courseDelete);

// Iniciar servidor
app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'))
