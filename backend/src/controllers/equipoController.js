const { Equipo } = require('../models');

// Crear un nuevo equipo
exports.create = async (req, res) => {
  const equipo = await Equipo.create(req.body);
  res.status(201).json(equipo);
};

// Listar todos los equipos
exports.getAll = async (req, res) => {
  const equipos = await Equipo.findAll();
  res.json(equipos);
};

// Obtener un equipo por ID
exports.getOne = async (req, res) => {
  const equipo = await Equipo.findByPk(req.params.id);
  if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
  res.json(equipo);
};

// Actualizar un equipo
exports.update = async (req, res) => {
  const equipo = await Equipo.findByPk(req.params.id);
  if (!equipo) return res.status(404).json({ error: 'No encontrado' });

  await equipo.update(req.body);
  res.json(equipo);
};

// Eliminar un equipo
exports.remove = async (req, res) => {
  const equipo = await Equipo.findByPk(req.params.id);
  if (!equipo) return res.status(404).json({ error: 'No encontrado' });

  await equipo.destroy();
  res.json({ mensaje: 'Equipo eliminado' });
};
