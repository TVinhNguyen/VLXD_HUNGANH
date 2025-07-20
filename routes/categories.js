const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route có dạng: /danh-muc/ten-danh-muc-slug
router.get('/:slug', categoryController.getProductsByCategory);

module.exports = router;