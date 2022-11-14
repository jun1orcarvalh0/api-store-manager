const productModel = require('../models/product.model');

const findAll = async () => {
  const products = await productModel.findAll();
    return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  if (product) {
    return { type: null, message: product };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createProduct = async (name) => {
  // const error = validateNewProduct(name);
  // if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (name, id) => {
  const checkId = await productModel.findById(id);

  if (!checkId) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  await productModel.updateById({ name, id });

  const getUpdatedProduct = await productModel.findById(id);

  return { type: null, message: getUpdatedProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};