import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', (categoryController.getCategoryPage));

// Route có dạng: /danh-muc/ten-danh-muc-slug
router.get('/:slug', categoryController.getProductsByCategory);

export default router;
