module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.TEXT
    });
    return Categoria;
  };