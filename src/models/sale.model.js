const camelize = require('camelize');
const snakeize = require('snakeize');
const conn = require('./connection');

  const selects = 'sp.product_id, sp.quantity, s.date';
  const from = 'FROM StoreManager.sales_products';
  const asOn = 'AS sp INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id';
  const order = 'WHERE sp.sale_id = ? ORDER BY sale_id, product_id';

const findAll = async () => {
  const [result] = await conn.execute(
    `SELECT sp.sale_id, ${selects} ${from} ${asOn} ORDER BY sale_id, product_id`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await conn.execute(
    `SELECT ${selects} ${from} ${asOn} ${order}`,
    [id],
  );
  return camelize(result);
};

const deleteById = async ({ id }) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  await conn.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);

  return result;
};

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO sales () VALUE ()',
  );

  return insertId;
};

const insertProducts = async (sales) => {
  const values = sales.reduce((p, c) => [[...Object.values(p)], [...Object.values(c)]]);

  const columns = Object.keys(snakeize(sales[0]))
    .map((key) => `${key}`)
    .join(', ');

   await conn.query(
    `INSERT INTO sales_products (${columns}) VALUES ?`,
    [values],
  );
};

module.exports = {
  insertSale,
  insertProducts,
  findAll,
  findById,
  deleteById,
};