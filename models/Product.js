const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true
    },
    slug: String,
    description: { // Mô tả chi tiết cho người dùng
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category', // Tham chiếu đến model Category
        required: true
    },
    images: [String],
    // --- Các trường quan trọng cho SEO ---
    metaTitle: { // Tối ưu cho thẻ <title>
        type: String,
        required: [true, 'Meta Title là bắt buộc cho SEO']
    },
    metaDescription: { // Tối ưu cho thẻ <meta name="description">
        type: String,
        required: [true, 'Meta Description là bắt buộc cho SEO']
    },
    // Dữ liệu có cấu trúc (Schema.org) cho sản phẩm
    structuredData: {
        '@context': { type: String, default: 'https://schema.org/' },
        '@type': { type: String, default: 'Product' },
        name: String,
        image: [String],
        description: String,
        sku: String, // Mã sản phẩm
        brand: {
            '@type': { type: String, default: 'Brand' },
            name: String
        },
        offers: {
            '@type': { type: String, default: 'Offer' },
            url: String,
            priceCurrency: { type: String, default: 'VND' },
            price: String,
            availability: { type: String, default: 'https://schema.org/InStock' },
            itemCondition: { type: String, default: 'https://schema.org/NewCondition' }
        }
    }
}, { timestamps: true });

// Tự động tạo slug
productSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;