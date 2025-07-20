const express = require('express');
const router = express.Router();
const sitemapController = require('../controllers/sitemapController');
const pageController = require('../controllers/pageController'); // Import controller mới

// Route trang chủ sẽ gọi controller
router.get('/', pageController.getHomepage);

// Route sitemap giữ nguyên
router.get('/sitemap.xml', sitemapController.generateSitemap);

module.exports = router;