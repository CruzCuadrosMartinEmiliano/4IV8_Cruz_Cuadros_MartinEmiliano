const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión con promesas directamente
const app = express();

// Conexión a la base de datos
const pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'Cu4dr0z_@17', database: 'primerbasededatos' });

// Middlewares (Reemplazan a LeerBody y servirArchivoEstatico)
app.use(express.json()); // Parsea el JSON del body automáticamente
app.use(express.static('public')); // Sirve la carpeta public y maneja los MIME types

// Rutas de tu API (Reemplaza los if/else del servidor manual)
app.get('/api/prueba', async (req, res) => {
    // const [rows] = await pool.query('SELECT * FROM tabla');
    res.json({ mensaje: "¡Servidor Express funcionando!" }); // Reemplaza a enviarJSON
});

// inicializar servidor
app.listen(process.env.PORT || 3000, () => console.log('Servidor listo en el puerto 3000'));