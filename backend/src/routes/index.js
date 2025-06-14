const express = require('express');
const router = express.Router();

router.use('/users', require('./usuarioRoutes.js'));
// router.use('/equipos', require('./equipoRoutes')); // ejemplo

module.exports = router;
