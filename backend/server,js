require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado a la base de datos');

    await sequelize.sync(); // En producción puedes usar migraciones
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
  }
}

main();
