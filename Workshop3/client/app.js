// ============================================
// VARIABLES GLOBALES
// ============================================
const API_URL = '/api';

// ============================================
// FUNCIONES DE NAVEGACIÓN ENTRE TABS
// ============================================

function mostrarTab(tabName) {
    // Ocultar todos los tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar el tab seleccionado
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.target.classList.add('active');

    // Cargar datos según el tab
    if (tabName === 'profesores') {
        cargarProfesores();
    } else if (tabName === 'cursos') {
        cargarCursos();
        cargarProfesoresEnSelect();
    }
}

// ============================================
// FUNCIONES PARA PROFESORES
// ============================================

// Cargar todos los profesores y mostrarlos en la tabla
async function cargarProfesores() {
    try {
        const response = await fetch(`${API_URL}/profesores`);
        const profesores = await response.json();

        const tbody = document.querySelector('#tabla-profesores tbody');
        tbody.innerHTML = '';

        profesores.forEach(profesor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${profesor.nombre}</td>
                <td>${profesor.apellidos}</td>
                <td>${profesor.cedula}</td>
                <td>${profesor.edad}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarProfesor('${profesor._id}')">Editar</button>
                    <button class="btn btn-delete" onclick="eliminarProfesor('${profesor._id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar profesores:', error);
        alert('Error al cargar la lista de profesores');
    }
}

// Manejar el envío del formulario de profesor (crear o actualizar)
document.addEventListener('DOMContentLoaded', () => {
    const formProfesor = document.getElementById('form-profesor');
    formProfesor.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('profesor-id').value;
        const profesor = {
            nombre: document.getElementById('profesor-nombre').value,
            apellidos: document.getElementById('profesor-apellidos').value,
            cedula: document.getElementById('profesor-cedula').value,
            edad: parseInt(document.getElementById('profesor-edad').value)
        };

        try {
            let response;
            if (id) {
                // Actualizar profesor existente
                response = await fetch(`${API_URL}/profesores/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profesor)
                });
            } else {
                // Crear nuevo profesor
                response = await fetch(`${API_URL}/profesores`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profesor)
                });
            }

            if (response.ok) {
                alert(id ? 'Profesor actualizado exitosamente' : 'Profesor creado exitosamente');
                formProfesor.reset();
                document.getElementById('profesor-id').value = '';
                document.getElementById('profesor-form-title').textContent = 'Agregar Nuevo Profesor';
                cargarProfesores();
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar el profesor');
        }
    });

    // Cargar profesores al inicio
    cargarProfesores();
});

// Editar un profesor (cargar datos en el formulario)
async function editarProfesor(id) {
    try {
        const response = await fetch(`${API_URL}/profesores/${id}`);
        const profesor = await response.json();

        document.getElementById('profesor-id').value = profesor._id;
        document.getElementById('profesor-nombre').value = profesor.nombre;
        document.getElementById('profesor-apellidos').value = profesor.apellidos;
        document.getElementById('profesor-cedula').value = profesor.cedula;
        document.getElementById('profesor-edad').value = profesor.edad;

        document.getElementById('profesor-form-title').textContent = 'Editar Profesor';

        // Scroll al formulario
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error al cargar profesor:', error);
        alert('Error al cargar los datos del profesor');
    }
}

// Eliminar un profesor
async function eliminarProfesor(id) {
    if (!confirm('¿Está seguro de eliminar este profesor?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/profesores/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Profesor eliminado exitosamente');
            cargarProfesores();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el profesor');
    }
}

// Cancelar edición de profesor
function cancelarEdicionProfesor() {
    document.getElementById('form-profesor').reset();
    document.getElementById('profesor-id').value = '';
    document.getElementById('profesor-form-title').textContent = 'Agregar Nuevo Profesor';
}

// ============================================
// FUNCIONES PARA CURSOS
// ============================================

// Cargar todos los cursos y mostrarlos en la tabla
async function cargarCursos() {
    try {
        const response = await fetch(`${API_URL}/cursos`);
        const cursos = await response.json();

        const tbody = document.querySelector('#tabla-cursos tbody');
        tbody.innerHTML = '';

        cursos.forEach(curso => {
            const nombreProfesor = curso.profesorId
                ? `${curso.profesorId.nombre} ${curso.profesorId.apellidos}`
                : 'Sin profesor';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${curso.codigo}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${nombreProfesor}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarCurso('${curso._id}')">Editar</button>
                    <button class="btn btn-delete" onclick="eliminarCurso('${curso._id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar cursos:', error);
        alert('Error al cargar la lista de cursos');
    }
}

// Cargar profesores en el select del formulario de cursos
async function cargarProfesoresEnSelect() {
    try {
        const response = await fetch(`${API_URL}/profesores`);
        const profesores = await response.json();

        const select = document.getElementById('curso-profesor');
        // Mantener la opción por defecto
        select.innerHTML = '<option value="">Seleccione un profesor...</option>';

        profesores.forEach(profesor => {
            const option = document.createElement('option');
            option.value = profesor._id;
            option.textContent = `${profesor.nombre} ${profesor.apellidos}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar profesores:', error);
    }
}

// Manejar el envío del formulario de curso (crear o actualizar)
document.addEventListener('DOMContentLoaded', () => {
    const formCurso = document.getElementById('form-curso');
    formCurso.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('curso-id').value;
        const curso = {
            nombre: document.getElementById('curso-nombre').value,
            codigo: document.getElementById('curso-codigo').value,
            descripcion: document.getElementById('curso-descripcion').value,
            profesorId: document.getElementById('curso-profesor').value
        };

        try {
            let response;
            if (id) {
                // Actualizar curso existente
                response = await fetch(`${API_URL}/cursos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(curso)
                });
            } else {
                // Crear nuevo curso
                response = await fetch(`${API_URL}/cursos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(curso)
                });
            }

            if (response.ok) {
                alert(id ? 'Curso actualizado exitosamente' : 'Curso creado exitosamente');
                formCurso.reset();
                document.getElementById('curso-id').value = '';
                document.getElementById('curso-form-title').textContent = 'Agregar Nuevo Curso';
                cargarCursos();
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar el curso');
        }
    });
});

// Editar un curso (cargar datos en el formulario)
async function editarCurso(id) {
    try {
        const response = await fetch(`${API_URL}/cursos/${id}`);
        const curso = await response.json();

        document.getElementById('curso-id').value = curso._id;
        document.getElementById('curso-nombre').value = curso.nombre;
        document.getElementById('curso-codigo').value = curso.codigo;
        document.getElementById('curso-descripcion').value = curso.descripcion;
        document.getElementById('curso-profesor').value = curso.profesorId._id;

        document.getElementById('curso-form-title').textContent = 'Editar Curso';

        // Scroll al formulario
        document.querySelector('#tab-cursos .form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error al cargar curso:', error);
        alert('Error al cargar los datos del curso');
    }
}

// Eliminar un curso
async function eliminarCurso(id) {
    if (!confirm('¿Está seguro de eliminar este curso?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cursos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Curso eliminado exitosamente');
            cargarCursos();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el curso');
    }
}

// Cancelar edición de curso
function cancelarEdicionCurso() {
    document.getElementById('form-curso').reset();
    document.getElementById('curso-id').value = '';
    document.getElementById('curso-form-title').textContent = 'Agregar Nuevo Curso';
}
