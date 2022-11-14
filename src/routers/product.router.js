const express = require('express');
const productController = require('../controllers/product.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.listProducts);

router.post('/', validateName, productController.createProduct);

router.get('/:id', productController.getProduct);

router.put('/:id', validateName, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;