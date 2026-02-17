const express = require('express');
const router = express.Router();

// Importar los controladores
const profesorController = require('../server/controllers/profesorController');
const courseController = require('../server/controllers/courseController');

// ============================================
// RUTAS PARA PROFESORES
// ============================================

// POST - Crear un nuevo profesor
router.post('/profesores', profesorController.crearProfesor);

// GET - Obtener todos los profesores
router.get('/profesores', profesorController.obtenerProfesores);

// GET - Obtener un profesor por ID
router.get('/profesores/:id', profesorController.obtenerProfesorPorId);

// PUT - Actualizar un profesor por ID
router.put('/profesores/:id', profesorController.actualizarProfesor);

// DELETE - Eliminar un profesor por ID
router.delete('/profesores/:id', profesorController.eliminarProfesor);

// ============================================
// RUTAS PARA CURSOS
// ============================================

// POST - Crear un nuevo curso
router.post('/cursos', courseController.crearCurso);

// GET - Obtener todos los cursos (con información del profesor)
router.get('/cursos', courseController.obtenerCursos);

// GET - Obtener un curso por ID (con información del profesor)
router.get('/cursos/:id', courseController.obtenerCursoPorId);

// PUT - Actualizar un curso por ID
router.put('/cursos/:id', courseController.actualizarCurso);

// DELETE - Eliminar un curso por ID
router.delete('/cursos/:id', courseController.eliminarCurso);

module.exports = router;
