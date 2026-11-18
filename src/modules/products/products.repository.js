const pool = require('../../config/database');

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, name, description, price, stock, created_at AS createdAt FROM products ORDER BY id DESC'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, description, price, stock, created_at AS createdAt FROM products WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

async function create({ name, description, price, stock }) {
  const [result] = await pool.execute(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [name, description || null, price, stock]
  );
  return findById(result.insertId);
}

async function update(id, { name, description, price, stock }) {
  await pool.execute(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
    [name, description || null, price, stock, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
