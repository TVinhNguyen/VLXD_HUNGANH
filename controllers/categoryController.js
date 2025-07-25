const Product = require('../models/Product');
const Category = require('../models/Category');



exports.getCategoryPage = async (req, res) => {
    try {
        const categorySlug = req.params.slug;
        const category = await Category.findOne({ slug: categorySlug });

        if (!category) {
            // TODO: Render trang 404
            return res.status(404).send('Danh mục không tồn tại');
        }

        // Lấy tất cả sản phẩm thuộc danh mục này
        const productsInCategory = await Product.find({ category: category._id });
        
        // Định dạng lại dữ liệu sản phẩm thành JSON cho Alpine.js
        const formattedProducts = productsInCategory.map(p => ({
            slug: p.slug,
            name: p.name,
            price: `₫${p.price.toLocaleString('vi-VN')}`,
            priceValue: p.price,
            image: p.images[0] || 'https://via.placeholder.com/300x200',
            description: p.metaDescription || "Mô tả ngắn cho sản phẩm này.",
            inStock: true // Giả sử còn hàng
        }));

        res.render('pages/category', {
            // Dữ liệu meta cho SEO, lấy từ DB
            meta: {
                title: category.metaTitle || `${category.name} - VLXD Hùng Anh`,
                description: category.metaDescription || `Danh sách sản phẩm thuộc danh mục ${category.name}`
            },
            category: category, // Thông tin của danh mục hiện tại (tên, mô tả...)
            // Truyền dữ liệu JSON vào view
            categoryProductsJson: JSON.stringify(formattedProducts)
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi Server');
    }
};
exports.getProductsByCategory = async (req, res) => {
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
        
        // --- BƯỚC THÊM MỚI ---
        // Định dạng lại dữ liệu sản phẩm thành một chuỗi JSON để Alpine.js có thể sắp xếp
        const formattedProductsJson = JSON.stringify(
            productsInCategory.map(p => ({
                // Các trường để hiển thị
                slug: p.slug,
                name: p.name,
                priceFormatted: `₫${p.price.toLocaleString('vi-VN')}`,
                images: p.images, // Giữ nguyên mảng ảnh
                
                // Các trường để sắp xếp
                price: p.price,
                createdAt: p.createdAt // Cần cho việc sắp xếp 'Mới nhất'
            }))
        );

        // Đổi tên file render sang file view mới của bạn nếu cần
        res.render('pages/category-detail', { // Hoặc 'pages/category-detail' tùy theo tên file của bạn
            // Dữ liệu meta được lấy trực tiếp từ DB, rất tốt cho SEO
            meta: {
                title: category.metaTitle || `${category.name} - VLXD Hùng Anh`,
                description: category.metaDescription || `Các sản phẩm thuộc danh mục ${category.name}`
            },
            category: category,
            products: productsInCategory, // Dữ liệu gốc vẫn giữ lại để EJS có thể đếm số lượng ban đầu
            productsJson: formattedProductsJson // <-- TRUYỀN CHUỖI JSON VÀO VIEW
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};