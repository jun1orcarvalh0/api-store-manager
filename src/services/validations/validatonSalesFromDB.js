const validationSaleFromDB = (sales) => {
  if (!sales) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: '' };
};

module.exports = validationSaleFromDB;