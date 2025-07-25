import sitemap from 'express-sitemap-xml';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

async function getUrls() {
    const urls = [];

    // Thêm các trang tĩnh
    urls.push({ url: '/', changefreq: 'daily', priority: 1.0 });
    urls.push({ url: '/gioi-thieu', changefreq: 'monthly', priority: 0.8 });
    
    // Lấy tất cả sản phẩm để thêm vào sitemap
    const products = await Product.find({}, 'slug updatedAt');
    products.forEach(product => {
        urls.push({
            url: `/san-pham/${product.slug}`,
            lastmod: product.updatedAt,
            changefreq: 'weekly',
            priority: 0.9
        });
    });

    // Tương tự, lấy tất cả danh mục
    const categories = await Category.find({}, 'slug updatedAt');
    categories.forEach(category => {
        urls.push({
            url: `/danh-muc/${category.slug}`,
            lastmod: category.updatedAt,
            changefreq: 'weekly',
            priority: 0.8
        });
    });

    return urls;
}

const generateSitemap = sitemap(getUrls, process.env.SITE_URL);

export default {
    generateSitemap
};
