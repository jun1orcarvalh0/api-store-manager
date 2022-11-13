const snakeize = require('snakeize');
const conn = require('./connection');

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
};