const saleService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.createSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { message } = await saleService.findAll();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json();
};

module.exports = {
  createSale,
  listSales,
  getSale,
  deleteSale,
};