const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route GET /san-pham : phải đặt trước route /:slug
router.get('/', productController.getAllProducts);

// Route GET /san-pham/:slug
router.get('/:slug', productController.getProductDetail);

module.exports = router;