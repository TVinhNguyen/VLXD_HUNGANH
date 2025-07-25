import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Route GET /san-pham : phải đặt trước route /:slug
router.get('/', productController.getAllProducts);

// Route GET /san-pham/:slug
router.get('/:slug', productController.getProductDetail);

export default router;
