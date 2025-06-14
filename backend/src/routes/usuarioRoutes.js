const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usuarioController');
=======
const ctrl = require('../controllers/usuarioController');


router.get('/', ctrl.getAll);
router.post('/', ctrl.create);

module.exports = router;
