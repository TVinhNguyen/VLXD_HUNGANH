const Product = require('../models/Product');
const Category = require('../models/Category');

// Hiển thị các sản phẩm theo slug của danh mục
exports.getProductsByCategory = async (req, res) => {
    try {
        const categorySlug = req.params.slug;
        const category = await Category.findOne({ slug: categorySlug });

        if (!category) {
            return res.status(404).send('Danh mục không tồn tại'); // TODO: Render trang 404
        }

        const productsInCategory = await Product.find({ category: category._id });

        res.render('pages/category', {
            // Dữ liệu meta được lấy trực tiếp từ DB, rất tốt cho SEO
            meta: {
                title: category.metaTitle || category.name,
                description: category.metaDescription || `Các sản phẩm thuộc danh mục ${category.name}`
            },
            category: category,
            products: productsInCategory
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};