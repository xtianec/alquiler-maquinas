const { Reserva, Equipo, Cliente } = require('../models');
const { Op } = require('sequelize');

// Crear una reserva validando disponibilidad
exports.create = async (req, res) => {
  const { equipoId, fecha_inicio, fecha_fin } = req.body;

  // Validar solapamiento de fechas
  const reservas = await Reserva.findAll({
    where: {
      equipoId,
      [Op.or]: [
        { fecha_inicio: { [Op.between]: [fecha_inicio, fecha_fin] } },
        { fecha_fin: { [Op.between]: [fecha_inicio, fecha_fin] } },
        {
          [Op.and]: [
            { fecha_inicio: { [Op.lte]: fecha_inicio } },
            { fecha_fin: { [Op.gte]: fecha_fin } }
          ]
        }
      ]
    }
  });

  if (reservas.length > 0) {
    return res.status(400).json({ error: 'Equipo no disponible en esas fechas' });
  }

  // Calcular días y total
  const dias = (new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24) + 1;
  const equipo = await Equipo.findByPk(equipoId);
  const total = dias * equipo.precio_diario;

  const reserva = await Reserva.create({ ...req.body, total });
  res.status(201).json(reserva);
};

// Obtener todas las reservas
exports.getAll = async (req, res) => {
  const reservas = await Reserva.findAll({
    include: [Equipo, Cliente]
  });
  res.json(reservas);
};
