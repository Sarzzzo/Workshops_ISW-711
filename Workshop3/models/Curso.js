const mongoose = require('mongoose');

// Definir el esquema (schema) para el modelo Curso
const cursoSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    codigo: {
        required: true,
        type: String,
        unique: true  // No permite códigos duplicados
    },
    descripcion: {
        required: true,
        type: String
    },
    profesorId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,  // Referencia al ID de un Profesor
        ref: 'Profesor'  // Nombre del modelo al que hace referencia
    }
});

// Exportar el modelo para usarlo en otras partes de la aplicación
module.exports = mongoose.model('Curso', cursoSchema);
