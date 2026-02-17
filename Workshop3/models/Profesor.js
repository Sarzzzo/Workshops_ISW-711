const mongoose = require('mongoose');

// Definir el esquema (schema) para el modelo Profesor
const profesorSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    apellidos: {
        required: true,
        type: String
    },
    cedula: {
        required: true,
        type: String,
        unique: true  // No permite cédulas duplicadas
    },
    edad: {
        required: true,
        type: Number,
        min: 18,  // Edad mínima
        max: 100  // Edad máxima
    }
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = mongoose.model('Profesor', profesorSchema);
