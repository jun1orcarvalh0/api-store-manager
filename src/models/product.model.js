const camelize = require('camelize');
const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const findByQuery = async (query) => {
  const [result] = await conn.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${query}%'`,
    [query],
  );
  return camelize(result);
};

const insert = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );

  return insertId;
};

const updateById = async ({ name, id }) => {
  const [result] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  return result;
};

const deleteById = async ({ id }) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  findByQuery,
};