const pool = require('../../config/database');

async function findByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, password_hash AS passwordHash, created_at AS createdAt FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

async function create({ name, email, passwordHash }) {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
  return findById(result.insertId);
}

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, name, email, created_at AS createdAt FROM users ORDER BY id DESC'
  );
  return rows;
}

module.exports = { findByEmail, findById, create, findAll };
