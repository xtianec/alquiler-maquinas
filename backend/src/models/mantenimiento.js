module.exports = (sequelize, DataTypes) => {
  const Mantenimiento = sequelize.define('Mantenimiento', {
    equipoId: DataTypes.INTEGER,
    fecha: DataTypes.DATEONLY,
    tipo: DataTypes.STRING,  // preventivo / correctivo
    observaciones: DataTypes.TEXT
  });

  return Mantenimiento;
};
