import express from 'express';
import sitemapController from '../controllers/sitemapController.js';
import pageController from '../controllers/pageController.js';

const router = express.Router();

// Route trang chủ sẽ gọi controller
router.get('/', pageController.getHomepage);

// Route sitemap giữ nguyên
router.get('/sitemap.xml', sitemapController.generateSitemap);

export default router;
