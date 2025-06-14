module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nombre: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      rol: DataTypes.ENUM('cliente', 'admin')
    });
    return User;
  };
  