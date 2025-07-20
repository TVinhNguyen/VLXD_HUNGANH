const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên danh mục là bắt buộc'],
        unique: true
    },
    slug: String, // URL thân thiện, ví dụ: gach-xay-dung
    description: String,
    metaTitle: String, // Thẻ <title> cho SEO
    metaDescription: String, // Thẻ <meta name="description"> cho SEO
}, { timestamps: true });

// Middleware để tự động tạo slug trước khi lưu
categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;