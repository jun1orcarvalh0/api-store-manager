module.exports = (req, res, next) => {
  const saleData = req.body;

  console.log(saleData);

  const validateProductId = saleData.every((sale) => typeof sale.productId === 'number');
  
  if (!validateProductId) { return res.status(400).json({ message: '"productId" is required' }); }
  
  const validateQuantity = saleData.every((sale) => typeof sale.quantity === 'number');

  if (!validateQuantity) { return res.status(400).json({ message: '"quantity" is required' }); }

  const validateQuantityNumber = saleData.every((sale) => sale.quantity >= 1);

  if (!validateQuantityNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};