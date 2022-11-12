const saleService = require('../services/sale.service');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await saleService.createSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};