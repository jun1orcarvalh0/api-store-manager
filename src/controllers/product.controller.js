const productService = require('../services/product.service');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  // const { type, message } = await productService.createProduct(name);
  const { message } = await productService.createProduct(name);

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProduct(name, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
};