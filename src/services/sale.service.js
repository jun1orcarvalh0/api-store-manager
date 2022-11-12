const saleModel = require('../models/sale.model');
const productModel = require('../models/product.model');

const createSale = async (sales) => {
  // const error = validateNewProduct(name);
  // if (error.type) return error;

  const getAllProductsId = await productModel.findAll();

  const checkProductId = sales.every((sale) => sale.productId in getAllProductsId);

  if (!checkProductId) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await saleModel.insertSale();
  const saleProductsWithId = sales.reduce((p, c) => [{ saleId, ...p }, { saleId, ...c }]);
  await saleModel.insertProducts(saleProductsWithId);

  const newSale = { id: saleId, itemsSold: sales };

  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};