const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// GET /api/NBATeams - Listar todos los equipos para los selects del frontend
router.get('/', async (req, res) => {
    try {
        const [teams] = await db.execute('SELECT id, nombre_equipo, conferencia FROM NBATeams ORDER BY nombre_equipo ASC');
        res.json({
            status: 'success',
            data: teams
        });
    } catch (error) {
        console.error('Error al obtener NBATeams:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;