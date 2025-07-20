const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
    try {
        // Lấy tất cả sản phẩm và danh mục từ database
        const allProducts = await Product.find().populate('category');
        const allCategories = await Category.find();

        // Định dạng lại dữ liệu cho phù hợp với template
        const formattedProducts = allProducts.map(p => ({
            slug: p.slug,
            name: p.name,
            category: p.category.name, // Lấy tên danh mục
            price: `₫${p.price.toLocaleString('vi-VN')}`, // Định dạng giá
            priceValue: p.price,
            image: p.images[0] || 'https://via.placeholder.com/300x200',
            description: p.metaDescription, // Dùng meta description cho mô tả ngắn
            inStock: true // Giả sử tất cả đều còn hàng, bạn có thể thêm trường này vào model
        }));
        
        const formattedCategories = ['Tất cả', ...allCategories.map(c => c.name)];

        res.render('pages/product-list', {
            meta: {
                title: 'Tất cả sản phẩm - VLXD Hùng Anh',
                description: 'Khám phá danh sách đầy đủ các sản phẩm vật liệu xây dựng chất lượng cao của chúng tôi.'
            },
            // Dữ liệu cần được JSON.stringify để Alpine.js có thể đọc được
            allProductsJson: JSON.stringify(formattedProducts),
            categories: formattedCategories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi Server');
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate('category');

        if (!product) {
            // TODO: Render một trang 404 chuyên nghiệp
            return res.status(404).render('pages/404', { 
                meta: { title: 'Không Tìm Thấy Sản Phẩm' } 
            });
        }

        // Tìm các sản phẩm liên quan (cùng danh mục, trừ sản phẩm hiện tại)
        const relatedProducts = await Product.find({ 
            category: product.category._id,
            _id: { $ne: product._id } // $ne = not equal
        }).limit(3);

        // Chuẩn bị dữ liệu cho structuredData
        // (Phần này có thể đã có, chỉ cần đảm bảo nó đầy đủ)
        product.structuredData.name = product.name;
        product.structuredData.image = product.images.map(img => `${process.env.SITE_URL}${img}`);
        product.structuredData.description = product.metaDescription;
        product.structuredData.offers.price = product.price.toString();
        product.structuredData.offers.url = `${process.env.SITE_URL}/san-pham/${product.slug}`;


        res.render('pages/product-detail', {
            meta: {
                title: product.metaTitle,
                description: product.metaDescription
            },
            product: product,
            relatedProducts: relatedProducts // <-- Truyền sản phẩm liên quan vào view
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi Server');
    }
};


// Hiển thị danh sách sản phẩm của một danh mục
exports.getProductsByCategory = async (req, res) => {
    // Logic tương tự
};