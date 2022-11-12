const saleModel = require('../models/sale.model');

const createSale = async (sales) => {
  // const error = validateNewProduct(name);
  // if (error.type) return error;

  const SaleId = await saleModel.insertSale();
  const saleProductsWithId = sales.reduce((p, c) => [{ SaleId, ...p }, { SaleId, ...c }]);
  const newSaleProducts = await saleModel.insertProducts(saleProductsWithId);

  // // const newSale = await saleModel.findById(newSaleId);

  return { type: null, message: newSaleProducts };
};

module.exports = {
  createSale,
};