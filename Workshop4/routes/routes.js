const express = require('express');
const router = express.Router();

// Importar los controladores
const profesorController = require('../server/controllers/profesorController');
const courseController = require('../server/controllers/courseController');

// ============================================
// RUTAS PARA PROFESORES
// ============================================

router.post('/profesores', profesorController.crearProfesor);

router.get('/profesores', profesorController.obtenerProfesores);

router.get('/profesores/:id', profesorController.obtenerProfesorPorId);

router.put('/profesores/:id', profesorController.actualizarProfesor);

router.delete('/profesores/:id', profesorController.eliminarProfesor);

// ============================================
// RUTAS PARA CURSOS
// ============================================

router.post('/cursos', courseController.crearCurso);

router.get('/cursos', courseController.obtenerCursos);

router.get('/cursos/:id', courseController.obtenerCursoPorId);

router.put('/cursos/:id', courseController.actualizarCurso);

router.delete('/cursos/:id', courseController.eliminarCurso);

module.exports = router;
