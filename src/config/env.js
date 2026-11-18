const dotenv = require('dotenv');

dotenv.config();

function getInteger(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} debe ser un entero positivo`);
  }
  return parsed;
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET es obligatorio y debe tener al menos 32 caracteres');
}

const nodeEnv = process.env.NODE_ENV || 'development';
if (!['development', 'test', 'production'].includes(nodeEnv)) {
  throw new Error('NODE_ENV debe ser development, test o production');
}

module.exports = {
  nodeEnv,
  port: getInteger('PORT', 3000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: getInteger('DB_PORT', 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'sigem_pyme',
    connectionLimit: getInteger('DB_CONNECTION_LIMIT', 10)
  },
  jwt: {
    secret: jwtSecret,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  }
};
