const saleModel = require('../models/sale.model');
const productModel = require('../models/product.model');
const validationProductsFromDB = require('./validations/validationProductsFromDB');

// const validationSaleFromDB = require('./validations/validatonSalesFromDB');

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

const findAll = async () => {
  const sales = await saleModel.findAll();

  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);
  if (sale.length > 1) {
    return { type: null, message: sale };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createSale,
  findAll,
  findById,
};