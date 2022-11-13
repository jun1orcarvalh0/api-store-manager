const saleModel = require('../models/sale.model');
const productModel = require('../models/product.model');
const validationProductsFromDB = require('./validations/validationProductsFromDB');

const createSale = async (sales) => {
  const getAllProductsId = await productModel.findAll();

  const error = await validationProductsFromDB(sales, getAllProductsId);

   if (error.type) return error;

  const saleId = await saleModel.insertSale();
  const saleProductsWithId = sales.reduce((p, c) => [{ saleId, ...p }, { saleId, ...c }]);
  await saleModel.insertProducts(saleProductsWithId);

  const newSale = { id: saleId, itemsSold: sales };

  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};