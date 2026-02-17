const Profesor = require('../../models/Profesor');

// POST - Crear un nuevo profesor
const crearProfesor = async (req, res) => {
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
};

// GET - Obtener todos los profesores
const obtenerProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET - Obtener un profesor por ID
const obtenerProfesorPorId = async (req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Actualizar un profesor por ID
const actualizarProfesor = async (req, res) => {
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
};

// DELETE - Eliminar un profesor por ID
const eliminarProfesor = async (req, res) => {
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
};

module.exports = {
    crearProfesor,
    obtenerProfesores,
    obtenerProfesorPorId,
    actualizarProfesor,
    eliminarProfesor
};
