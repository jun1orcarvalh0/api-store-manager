const express = require('express');
const saleController = require('../controllers/sale.controller');
const validateSaleFields = require('../middlewares/validateSaleFields');
// const productController = require('../controllers/product.controller');
// const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', saleController.listSales);

router.get('/:id', saleController.getSale);

router.post('/', validateSaleFields, saleController.createSale);

router.delete('/:id', saleController.deleteSale);

// saleController.createSale

// router.get('/:id', productController.getProduct);

module.exports = router;