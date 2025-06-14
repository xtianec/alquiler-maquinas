const { Mantenimiento } = require('../models');

exports.getAll = async (req, res) => res.json(await Mantenimiento.findAll());
exports.getOne = async (req, res) => res.json(await Mantenimiento.findByPk(req.params.id));
exports.create = async (req, res) => res.status(201).json(await Mantenimiento.create(req.body));
exports.update = async (req, res) => {
  const item = await Mantenimiento.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.update(req.body);
  res.json(item);
};
exports.remove = async (req, res) => {
  const item = await Mantenimiento.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  await item.destroy();
  res.json({ mensaje: 'Eliminado' });
};
