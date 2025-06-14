module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    tipo_cliente: DataTypes.ENUM('persona_natural', 'empresa'),
    tipo_documento: DataTypes.ENUM('dni', 'ruc', 'pasaporte', 'extranjero_empresa'),
    documento: { type: DataTypes.STRING, unique: true },
    nombre_completo: DataTypes.STRING,   // Solo se usa si es persona natural
    razon_social: DataTypes.STRING,      // Se usa si es empresa
    pais_origen: DataTypes.STRING,       // Útil para identificar empresas extranjeras
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  });
  return Cliente;
};
