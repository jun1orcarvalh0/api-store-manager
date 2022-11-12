const camelize = require('camelize');
const snakeize = require('snakeize');
const conn = require('./connection');

const findById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO sales () VALUE ()',
  );

  return insertId;
};

const insertProducts = async (sales) => {
  const values = sales.reduce((p, c) => [[...Object.values(p)], [...Object.values(c)]]);

  console.log(values);

  const columns = Object.keys(snakeize(sales[0]))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(sales[0])
    .map((_key) => '?')
    .join(', ');
  
  console.log(placeholders);

  console.log(columns, placeholders);

  const [{ insertId }] = await conn.query(
    `INSERT INTO sales_products (${columns}) VALUES ?`,
    [values],
  );

  return insertId;
};

module.exports = {
  insertSale,
  findById,
  insertProducts,
};