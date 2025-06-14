module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define('Reserva', {
    equipoId: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    total: DataTypes.FLOAT
  });

  return Reserva;
};
