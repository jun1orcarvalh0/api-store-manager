const express = require('express');
const saleController = require('../controllers/sale.controller');
// const productController = require('../controllers/product.controller');
// const validateName = require('../middlewares/validateName');

const router = express.Router();

// router.get('/', productController.listProducts);

router.post('/', saleController.createSale);

// saleController.createSale

// router.get('/:id', productController.getProduct);

module.exports = router;