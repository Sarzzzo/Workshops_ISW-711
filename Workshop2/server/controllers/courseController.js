/**
 * Controlador de Cursos
 * Maneja las operaciones CRUD para la entidad Course
 */

const Course = require("../models/courseModel");

/**
 * Crear un nuevo curso
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const coursePost = async (req, res) => {
    const data = new Course({
        name: req.body.name,
        credits: req.body.credits
    });

    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Obtener todos los cursos
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const courseGet = async (req, res) => {
    try {
        const data = await Course.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Obtener un curso por ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const courseGetOne = async (req, res) => {
    try {
        const data = await Course.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Actualizar parcialmente un curso (PATCH)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const coursePatch = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Course.findByIdAndUpdate(id, updatedData, options);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Actualizar completamente un curso (PUT)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const coursePut = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            name: req.body.name,
            credits: req.body.credits
        };
        const options = { new: true };

        const result = await Course.findByIdAndUpdate(id, updatedData, options);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Eliminar un curso
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const courseDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Course.findByIdAndDelete(id);
        res.json({ message: `Course "${data.name}" has been deleted`, course: data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    courseGet,
    courseGetOne,
    coursePost,
    coursePatch,
    coursePut,
    courseDelete
}
