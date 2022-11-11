const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.getProduct);

module.exports = router;