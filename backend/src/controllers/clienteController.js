const { Cliente } = require('../models');

// Crea un nuevo cliente (persona natural o empresa)
exports.create = async (req, res) => {
  const exists = await Cliente.findOne({ where: { documento: req.body.documento } });
  if (exists) return res.status(400).json({ error: 'Cliente ya registrado' });

  const cliente = await Cliente.create(req.body);
  res.status(201).json(cliente);
};

// Devuelve todos los clientes registrados
exports.getAll = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

// Devuelve un cliente específico por su ID
exports.getOne = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'No encontrado' });
  res.json(cliente);
};

// Actualiza los datos de un cliente
exports.update = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'No encontrado' });

  await cliente.update(req.body);
  res.json(cliente);
};

// Elimina un cliente
exports.remove = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'No encontrado' });

  await cliente.destroy();
  res.json({ mensaje: 'Eliminado' });
};
