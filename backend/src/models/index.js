const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Importar modelos
const Usuario = require('./usuario')(sequelize, DataTypes);
const Cliente = require('./cliente')(sequelize, DataTypes);
const Equipo = require('./equipo')(sequelize, DataTypes);
const Reserva = require('./reserva')(sequelize, DataTypes);
const Manual = require('./manual')(sequelize, DataTypes);
const Mantenimiento = require('./mantenimiento')(sequelize, DataTypes);

// Relaciones
Reserva.belongsTo(Equipo, { foreignKey: 'equipoId' });
Reserva.belongsTo(Cliente, { foreignKey: 'clienteId' });
Manual.belongsTo(Equipo, { foreignKey: 'equipoId' });
Mantenimiento.belongsTo(Equipo, { foreignKey: 'equipoId' });

module.exports = {
  sequelize,
  Usuario,
  Cliente,
  Equipo,
  Reserva,
  Manual,
  Mantenimiento
};
