module.exports = (sequelize, DataTypes) => {
    const Equipo = sequelize.define('Equipo', {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      especificaciones: DataTypes.TEXT,
      estado: {
        type: DataTypes.ENUM('disponible', 'reservado', 'en_mantenimiento', 'fuera_de_servicio'),
        defaultValue: 'disponible'
      },
      precio_diario: DataTypes.DECIMAL(10, 2),
      categoria_id: DataTypes.INTEGER
    });
    return Equipo;
  };