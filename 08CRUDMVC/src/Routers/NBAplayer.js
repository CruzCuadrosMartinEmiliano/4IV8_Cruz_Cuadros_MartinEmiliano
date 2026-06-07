// ============================================================
// PRÁCTICA 3 - PNT: Rutas de NBA Players (Express Router)
// ============================================================
const express = require('express');
const router = express.Router();

// Importar la conexión a la base de datos
const db = require('../DB/database');

// ============================================================
// FUNCIÓN: Validar datos de jugador (ACTUALIZADA)
// ============================================================
function validarNBAplayer(datos) {
    const errores = [];

    if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2) {
        errores.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }

    // Validar que la edad sea un número entero válido
    if (!datos.edad || isNaN(datos.edad) || parseInt(datos.edad) <= 19 ) {
        errores.push('La edad es obligatoria y debe ser mayor a 19 años');
    }
    
    // Validar que la altura sea un número decimal válido
    if (!datos.altura_metros || isNaN(datos.altura_metros) || parseFloat(datos.altura_metros) <= 0) {
        errores.push('La altura en metros es obligatoria y debe ser un número decimal válido');
    }

    // Validar que el equipo_id sea un número (el ID proveniente de NBATeams)
    if (!datos.equipo_id || isNaN(datos.equipo_id)) {
        errores.push('El ID del equipo es obligatorio y debe ser un número válido');
    } 

    return errores;
}

// ============================================================
// GET /api/NBAplayer — Listar todos los jugadores con su Equipo
// ============================================================
router.get('/', async (req, res) => {
    try {
        // Usamos INNER JOIN para traer los datos del equipo desde NBATeams
        const [players] = await db.execute(`
            SELECT 
                p.id, 
                p.nombre, 
                p.edad, 
                p.altura_metros, 
                t.nombre_equipo AS equipo, 
                t.conferencia,
                p.created_at, 
                p.updated_at 
            FROM NBAplayer p
            INNER JOIN NBATeams t ON p.equipo_id = t.id
            ORDER BY p.id ASC
        `);

        res.json({
            status: 'success',
            data: players,
            count: players.length
        });

    } catch (error) {
        console.error('Error al listar NBAplayers:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// GET /api/NBAplayer/:id — Obtener un jugador por ID con su Equipo
// ============================================================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [player] = await db.execute(`
            SELECT 
                p.id, 
                p.nombre, 
                p.edad, 
                p.altura_metros, 
                t.nombre_equipo AS equipo, 
                t.conferencia,
                p.created_at, 
                p.updated_at 
            FROM NBAplayer p
            INNER JOIN NBATeams t ON p.equipo_id = t.id
            WHERE p.id = ?
        `, [id]);

        if (player.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Jugador con ID ${id} no encontrado`
            });
        }

        res.json({ status: 'success', data: player[0] });

    } catch (error) {
        console.error('Error al obtener NBAplayer:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// POST /api/NBAplayer — Crear nuevo jugador
// ============================================================
router.post('/', async (req, res) => {
    try {
        const errores = validarNBAplayer(req.body);
        if (errores.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: errores.join('; ')
            });
        }

        const { nombre, edad, altura_metros, equipo_id } = req.body;

        // Insertamos usando los nuevos campos numéricos
        const [resultado] = await db.execute(
            'INSERT INTO NBAplayer (nombre, edad, altura_metros, equipo_id) VALUES (?, ?, ?, ?)',
            [nombre.trim(), parseInt(edad), parseFloat(altura_metros), parseInt(equipo_id)]
        );

        // Devolvemos el jugador recién creado junto con el texto de su equipo
        const [nuevoPlayer] = await db.execute(`
            SELECT p.id, p.nombre, p.edad, p.altura_metros, t.nombre_equipo AS equipo, t.conferencia, p.created_at 
            FROM NBAplayer p
            INNER JOIN NBATeams t ON p.equipo_id = t.id
            WHERE p.id = ?
        `, [resultado.insertId]);

        res.status(201).json({
            status: 'success',
            data: nuevoPlayer[0]
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe este jugador registrado'
            });
        }
        console.error('Error al crear Jugador:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// PUT /api/NBAplayer/:id — Actualizar jugador
// ============================================================
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [existente] = await db.execute('SELECT id FROM NBAplayer WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Jugador con ID ${id} no encontrado`
            });
        }

        const errores = validarNBAplayer(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join('; ') });
        }

        const { nombre, edad, altura_metros, equipo_id } = req.body;

        // CORREGIDO: Eliminamos los .trim() de las variables numéricas y ordenamos los parámetros
        await db.execute(
            'UPDATE NBAplayer SET nombre = ?, edad = ?, altura_metros = ?, equipo_id = ? WHERE id = ?',
            [nombre.trim(), parseInt(edad), parseFloat(altura_metros), parseInt(equipo_id), id]
        );

        // Obtenemos los datos actualizados incluyendo el nombre del equipo
        const [actualizado] = await db.execute(`
            SELECT p.id, p.nombre, p.edad, p.altura_metros, t.nombre_equipo AS equipo, t.conferencia, p.created_at, p.updated_at 
            FROM NBAplayer p
            INNER JOIN NBATeams t ON p.equipo_id = t.id
            WHERE p.id = ?
        `, [id]);

        res.json({ status: 'success', data: actualizado[0] });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Error de duplicado al actualizar el jugador'
            });
        }
        console.error('Error al actualizar NBAplayer:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// DELETE /api/NBAplayer/:id — Eliminar jugador
// ============================================================
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [player] = await db.execute(
            'SELECT id, nombre FROM NBAplayer WHERE id = ?', [id]
        );

        if (player.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Jugador con ID ${id} no encontrado`
            });
        }

        await db.execute('DELETE FROM NBAplayer WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: {
                eliminado: player[0],
                mensaje: `Jugador "${player[0].nombre}" eliminado correctamente`
            }
        });

    } catch (error) {
        console.error('Error al eliminar NBAplayer:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// CRÍTICO: Exportar el router para que server.js lo reconozca y no de error 400/404
module.exports = router;