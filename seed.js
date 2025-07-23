const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models

const Category = require('./models/Category');

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dbzinf4uk/image/upload/v1752942226/';

const categories = [
    {
        name: 'Gạch Ốp Lát',
        description: 'Các loại gạch men, gạch bóng kiếng, gạch trang trí cao cấp cho mọi không gian nội, ngoại thất.',
        image: 'https://images.unsplash.com/photo-1593998993878-9e58ab332204?q=80&w=1287&auto=format&fit=crop',
        metaTitle: 'Gạch Ốp Lát Cao Cấp | Gạch Men, Gạch Bóng Kiếng Chính Hãng',
        metaDescription: 'Phân phối gạch ốp lát cao cấp, đa dạng mẫu mã và kích thước. Báo giá gạch men, gạch bóng kiếng, gạch thẻ trang trí giá tốt nhất.'
    },
    {
        name: 'Thiết Bị Vệ Sinh',
        description: 'Cung cấp bồn cầu, lavabo, vòi sen, và phụ kiện phòng tắm từ các thương hiệu uy tín như Inax, Toto.',
        image: 'https://images.unsplash.com/photo-1601131124430-67c3a078f78a?q=80&w=1287&auto=format&fit=crop',
        metaTitle: 'Thiết Bị Vệ Sinh Inax, Toto | Bồn Cầu, Lavabo, Vòi Sen',
        metaDescription: 'Đại lý chính hãng thiết bị vệ sinh Inax, Toto. Cung cấp bồn cầu, lavabo, vòi sen, bồn tắm với giá chiết khấu cao cho công trình.'
    },
    {
        name: 'Thiết Bị Điện',
        description: 'Đầy đủ các loại công tắc, ổ cắm, aptomat, dây điện, và đèn chiếu sáng an toàn, chất lượng.',
        image: 'https://images.unsplash.com/photo-1588881223539-33d368b6d7a4?q=80&w=1287&auto=format&fit=crop',
        metaTitle: 'Thiết Bị Điện Dân Dụng | Công Tắc, Ổ Cắm, Dây Điện An Toàn',
        metaDescription: 'Cung cấp thiết bị điện dân dụng và công nghiệp. Các loại công tắc, ổ cắm, aptomat, dây điện Cadivi, đèn LED chính hãng, giá tốt.'
    },
    {
        name: 'Sơn Nước & Chống Thấm',
        description: 'Các dòng sơn nội thất, ngoại thất và vật liệu chống thấm chuyên dụng từ các thương hiệu hàng đầu.',
        image: 'https://images.unsplash.com/photo-1596791775742-1275258e72c0?q=80&w=1287&auto=format&fit=crop',
        metaTitle: 'Sơn Nước & Vật Liệu Chống Thấm | Dulux, Jotun Chính Hãng',
        metaDescription: 'Đại lý sơn Dulux, Jotun, Kova chính hãng. Chuyên cung cấp các loại sơn nước nội ngoại thất và các giải pháp chống thấm hiệu quả.'
    },
    {
        name: 'Thiết Bị Nước',
        description: 'Ống nước và phụ kiện PVC, PPR chịu nhiệt, bền bỉ cho hệ thống cấp thoát nước gia đình và công nghiệp.',
        image: 'https://plus.unsplash.com/premium_photo-1661858342115-373c21d8b16e?q=80&w=1287&auto=format&fit=crop',
        metaTitle: 'Ống Nước & Phụ Kiện | Ống Nhựa Bình Minh, Tiền Phong',
        metaDescription: 'Cung cấp ống nước và phụ kiện PVC, PPR Bình Minh, Tiền Phong. Đầy đủ quy cách, giá cạnh tranh cho công trình và đại lý.'
    }
];

const importData = async () => {
    try {
        console.log('Đã xóa dữ liệu cũ thành công.');

        console.log('Đang thêm danh mục...');
        const createdCategories = await Category.create(categories);
        console.log('Đã thêm danh mục thành công.');

        // Tạo một map để dễ dàng lấy ObjectId của category từ tên
        const categoryMap = createdCategories.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});

    
        
        console.log('---------------------------------');
        console.log('Dữ liệu đã được thêm thành công!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};



if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Vui lòng sử dụng cờ -i để thêm dữ liệu hoặc -d để xóa dữ liệu.');
    process.exit();
}