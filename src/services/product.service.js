const productModel = require('../models/product.model');

const findAll = async () => {
  const drivers = await productModel.findAll();
    return { type: null, message: drivers };
};

const findById = async (id) => {
  const driver = await productModel.findById(id);
  if (driver) {
    return { type: null, message: driver };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};