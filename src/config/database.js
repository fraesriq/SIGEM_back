const mysql = require('mysql2/promise');
const { database } = require('./env');

const pool = mysql.createPool({
  host: database.host,
  port: database.port,
  user: database.user,
  password: database.password,
  database: database.name,
  connectionLimit: database.connectionLimit,
  waitForConnections: true,
  queueLimit: 0
});

module.exports = pool;
