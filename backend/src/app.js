const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/equipos', require('./routes/equipoRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/manuales', require('./routes/manualRoutes'));
app.use('/api/mantenimientos', require('./routes/mantenimientoRoutes'));

module.exports = app;
