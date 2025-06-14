module.exports = (sequelize, DataTypes) => {
  const Manual = sequelize.define('Manual', {
    equipoId: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    url: DataTypes.STRING
  });

  return Manual;
};
