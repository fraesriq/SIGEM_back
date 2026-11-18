const app = require('./app');
const pool = require('./config/database');
const env = require('./config/env');
const logger = require('./utils/logger');

async function start() {
  await pool.query('SELECT 1');
  const server = app.listen(env.port, () => {
    logger.info(`Servidor iniciado en el puerto ${env.port}`);
  });

  async function shutdown(signal) {
    logger.info(`Cerrando servidor (${signal})`);
    server.close(async (error) => {
      if (error) {
        logger.error('Error al cerrar el servidor', { message: error.message });
        process.exitCode = 1;
      }
      await pool.end();
    });
  }

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch(async (error) => {
  logger.error('No se pudo iniciar el servidor', { message: error.message });
  await pool.end();
  process.exitCode = 1;
});
