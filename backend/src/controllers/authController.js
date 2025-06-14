const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controlador para registrar usuarios (empleados o administradores)
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const exists = await Usuario.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: 'Correo ya registrado' });

  const hash = await bcrypt.hash(password, 10); // Encriptamos la contraseña
  const user = await Usuario.create({ nombre, email, password: hash });
  res.status(201).json(user);
};

// Controlador para login de usuarios
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Usuario.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password); // Verificamos contraseña
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  // Generamos un token con el ID y rol del usuario
  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.json({ token, user });
};
