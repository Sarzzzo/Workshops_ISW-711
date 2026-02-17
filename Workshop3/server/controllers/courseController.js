const Curso = require('../../models/Curso');
const Profesor = require('../../models/Profesor');

// POST - Crear un nuevo curso
const crearCurso = async (req, res) => {
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
};

// GET - Obtener todos los cursos (con información del profesor)
const obtenerCursos = async (req, res) => {
    try {
        // populate() trae los datos completos del profesor en lugar de solo el ID
        const cursos = await Curso.find().populate('profesorId');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET - Obtener un curso por ID (con información del profesor)
const obtenerCursoPorId = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id).populate('profesorId');
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Actualizar un curso por ID
const actualizarCurso = async (req, res) => {
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
};

// DELETE - Eliminar un curso por ID
const eliminarCurso = async (req, res) => {
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
};

module.exports = {
    crearCurso,
    obtenerCursos,
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso
};
