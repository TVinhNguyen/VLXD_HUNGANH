import Product from '../models/Product.js';
import Category from '../models/Category.js';

const getCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        // Count products for each category
        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const productCount = await Product.countDocuments({ category: category._id });
                return {
                    ...category.toObject(),
                    productCount
                };
            })
        );

        res.render('pages/categories-list', {
            meta: {
                title: 'Danh sách danh mục - Vật liệu Xây dựng Hùng Anh',
                description: 'Tất cả danh mục sản phẩm vật liệu xây dựng chất lượng cao',
                keywords: 'danh mục vật liệu xây dựng, phân loại sản phẩm, gạch, xi măng, sắt thép',
                canonical: `${process.env.SITE_URL}/danh-muc`
            },
            currentPath: '/danh-muc',
            categories: categoriesWithCount
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi Server');
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const categorySlug = req.params.slug;
        const category = await Category.findOne({ slug: categorySlug });

        if (!category) {
            // Nên render một trang 404 thân thiện
            return res.status(404).render('pages/404', { 
                meta: { title: '404 - Không Tìm Thấy Danh Mục' } 
            });
        }

        // Lấy tất cả sản phẩm thuộc danh mục này
        const productsInCategory = await Product.find({ category: category._id });
        
        // Định dạng lại dữ liệu sản phẩm để phù hợp với template
        const categoryProductsJson = JSON.stringify(
            productsInCategory.map(p => ({
                slug: p.slug,
                name: p.name,
                description: p.description,
                price: `${p.price.toLocaleString('vi-VN')} VNĐ`,
                priceValue: p.price,
                image: p.images && p.images.length > 0 ? p.images[0] : '/images/placeholder.jpg',
                category: category.name,
                inStock: p.inStock !== false
            }))
        );

        res.render('pages/category', {
            // Dữ liệu meta được lấy trực tiếp từ DB, rất tốt cho SEO
            meta: {
                title: category.metaTitle || `${category.name} - Vật liệu Xây dựng Hùng Anh`,
                description: category.metaDescription || `Các sản phẩm thuộc danh mục ${category.name}`,
                keywords: `${category.name}, vật liệu xây dựng, sản phẩm ${category.name}`,
                canonical: `${process.env.SITE_URL}/danh-muc/${category.slug}`
            },
            currentPath: `/danh-muc/${category.slug}`,
            category: category,
            products: productsInCategory,
            categoryProductsJson: categoryProductsJson
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};

export default {
    getCategoryPage,
    getProductsByCategory
};
