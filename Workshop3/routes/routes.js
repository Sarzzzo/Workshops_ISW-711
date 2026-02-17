const express = require('express');
const router = express.Router();

// Importar los modelos
const Profesor = require('../models/Profesor');
const Curso = require('../models/Curso');

// ============================================
// RUTAS PARA PROFESORES
// ============================================

// POST - Crear un nuevo profesor
router.post('/profesores', async (req, res) => {
    const profesor = new Profesor({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        edad: req.body.edad
    });

    try {
        const profesorGuardado = await profesor.save();
        res.status(200).json(profesorGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener todos los profesores
router.get('/profesores', async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Obtener un profesor por ID
router.get('/profesores/:id', async (req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Actualizar un profesor por ID
router.put('/profesores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const opciones = { new: true };  // Retorna el documento actualizado

        const resultado = await Profesor.findByIdAndUpdate(id, datosActualizados, opciones);
        if (!resultado) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Eliminar un profesor por ID
router.delete('/profesores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const profesor = await Profesor.findByIdAndDelete(id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json({ message: `Profesor ${profesor.nombre} ${profesor.apellidos} ha sido eliminado` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ============================================
// RUTAS PARA CURSOS
// ============================================

// POST - Crear un nuevo curso
router.post('/cursos', async (req, res) => {
    const curso = new Curso({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        profesorId: req.body.profesorId
    });

    try {
        // Verificar que el profesor existe
        const profesorExiste = await Profesor.findById(req.body.profesorId);
        if (!profesorExiste) {
            return res.status(404).json({ message: 'El profesor especificado no existe' });
        }

        const cursoGuardado = await curso.save();
        res.status(200).json(cursoGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener todos los cursos (con información del profesor)
router.get('/cursos', async (req, res) => {
    try {
        // populate() trae los datos completos del profesor en lugar de solo el ID
        const cursos = await Curso.find().populate('profesorId');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Obtener un curso por ID (con información del profesor)
router.get('/cursos/:id', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id).populate('profesorId');
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Actualizar un curso por ID
router.put('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;

        // Si se está actualizando el profesorId, verificar que existe
        if (datosActualizados.profesorId) {
            const profesorExiste = await Profesor.findById(datosActualizados.profesorId);
            if (!profesorExiste) {
                return res.status(404).json({ message: 'El profesor especificado no existe' });
            }
        }

        const opciones = { new: true };
        const resultado = await Curso.findByIdAndUpdate(id, datosActualizados, opciones).populate('profesorId');
        if (!resultado) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Eliminar un curso por ID
router.delete('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const curso = await Curso.findByIdAndDelete(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json({ message: `Curso ${curso.nombre} ha sido eliminado` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
