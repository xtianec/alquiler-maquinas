const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

// Registro de usuarios internos (solo admin puede hacerlo)
exports.create = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const exists = await Usuario.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: 'Correo ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, password: hash, rol });

  res.status(201).json(usuario);
};

// Listar todos los usuarios (sin contraseña)
exports.getAll = async (req, res) => {
  const usuarios = await Usuario.findAll({ attributes: { exclude: ['password'] } });
  res.json(usuarios);
};
