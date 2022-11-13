const express = require('express');
const saleController = require('../controllers/sale.controller');
const validateSaleFields = require('../middlewares/validateSaleFields');
// const productController = require('../controllers/product.controller');
// const validateName = require('../middlewares/validateName');

const router = express.Router();

// router.get('/', productController.listProducts);

router.get('/', saleController.listProducts);

router.get('/:id', saleController.getProduct);

router.post('/', validateSaleFields, saleController.createSale);

// saleController.createSale

// router.get('/:id', productController.getProduct);

module.exports = router;