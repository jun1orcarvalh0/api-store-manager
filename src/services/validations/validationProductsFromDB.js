const validationProductsFromDB = (sales, getAllProductsId) => {
  const checkProductId = sales.every((sale) => sale.productId in getAllProductsId);
  
  if (!checkProductId) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

module.exports = validationProductsFromDB;