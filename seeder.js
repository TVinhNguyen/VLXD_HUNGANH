import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: './.env' });

// Load models
import Product from './models/Product.js';
import Category from './models/Category.js';

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// --- DỮ LIỆU MẪU ---

// Lưu ý: Thay 'your_cloud_name' bằng Cloud Name của bạn trên Cloudinary
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dbzinf4uk/image/upload/v1752942226/';

const categories = [
    {
        name: 'Gạch Xây Dựng',
        description: 'Các loại gạch tuynel, gạch block, gạch thẻ chất lượng cao cho mọi công trình.',
        metaTitle: 'Gạch Xây Dựng | Gạch Tuynel, Gạch Block Giá Rẻ',
        metaDescription: 'Cung cấp gạch xây dựng chất lượng cao, đa dạng chủng loại. Mua gạch ống, gạch thẻ, gạch block với giá tốt nhất tại kho.'
    },
    {
        name: 'Cát - Đá Xây Dựng',
        description: 'Cung cấp cát san lấp, cát xây tô, các loại đá 1x2, 4x6.',
        metaTitle: 'Cát Đá Xây Dựng | Báo Giá Cát Vàng, Cát Đen, Đá 1x2',
        metaDescription: 'Báo giá cát đá xây dựng mới nhất. Cung cấp cát vàng, cát đen, đá 1x2, đá 4x6... giao hàng tận công trình.'
    },
    {
        name: 'Xi Măng',
        description: 'Xi măng Hà Tiên, Holcim, Insee và nhiều thương hiệu uy tín khác.',
        metaTitle: 'Xi Măng Xây Dựng | Giá Xi Măng Hà Tiên, Holcim Hôm Nay',
        metaDescription: 'Đại lý phân phối xi măng chính hãng. Bảng giá xi măng Hà Tiên, Holcim, Insee cập nhật liên tục, chiết khấu cao.'
    },
    {
        name: 'Sắt Thép Xây Dựng',
        description: 'Thép Pomina, Việt Nhật, Hòa Phát chính hãng.',
        metaTitle: 'Sắt Thép Xây Dựng | Báo Giá Thép Pomina, Việt Nhật',
        metaDescription: 'Cung cấp sắt thép xây dựng Pomina, Việt Nhật, Hòa Phát... đủ mọi quy cách. Báo giá thép xây dựng cạnh tranh nhất thị trường.'
    }
];

const products = [
    {
        name: 'Gạch Ống 4 Lỗ Tuynel (Loại 1)',
        category: 'Gạch Xây Dựng', // Sẽ được map sang ObjectId sau
        price: 1200,
        images: [`${CLOUDINARY_BASE_URL}gach-ong-4-lo-vuong-80x80x180_wiecmi.webp`],
        description: '<h3>Đặc điểm nổi bật</h3><p>Gạch ống 4 lỗ Tuynel được sản xuất từ đất sét chất lượng cao, nung ở nhiệt độ cao theo công nghệ Tuynel, đảm bảo độ cứng và khả năng chịu lực tốt.</p><ul><li>Kích thước: 180x80x80 mm</li><li>Độ rỗng: >40%</li><li>Cường độ chịu nén: >= 35 N/mm2</li></ul>',
        metaTitle: 'Gạch Ống 4 Lỗ Tuynel Loại 1 | Giá Tốt, Chất Lượng Cao',
        metaDescription: 'Mua gạch ống 4 lỗ Tuynel loại 1, kích thước 180x80x80mm. Sản phẩm chất lượng, cường độ chịu nén cao, giá cạnh tranh cho công trình.'
    },
    {
        name: 'Cát Vàng Xây Tô',
        category: 'Cát - Đá Xây Dựng',
        price: 350000,
        images: [`${CLOUDINARY_BASE_URL}cat-vang-xay-dung_y6bxbx.webp`, `${CLOUDINARY_BASE_URL}cat-vang-xay-dung-1_uiammb.webp`],
        description: '<h3>Mô tả sản phẩm</h3><p>Cát vàng chuyên dùng cho công tác xây tô tường, láng nền. Hạt cát đều, sạch, không lẫn tạp chất, giúp bề mặt tường phẳng mịn và chắc chắn.</p><p>Đơn vị tính: 1 mét khối (m3)</p>',
        metaTitle: 'Cát Vàng Xây Tô | Giá Cát Vàng Theo Khối (m3) Mới Nhất',
        metaDescription: 'Báo giá cát vàng xây tô theo mét khối (m3) cạnh tranh. Cát sạch, hạt đều, không lẫn tạp chất, giao hàng nhanh chóng tại TPHCM và các tỉnh lân cận.'
    },
    {
        name: 'Xi Măng Xuân Thành PCB40',
        category: 'Xi Măng',
        price: 85000,
        images: [`${CLOUDINARY_BASE_URL}xi-mang-xuan-thanh_bafvoe.webp`],
        description: '<h3>Thông tin sản phẩm</h3><p>Xi măng Portland hỗn hợp Xuân Thành PCB40 là sản phẩm chất lượng cao, phù hợp cho mọi hạng mục công trình từ nhà ở dân dụng đến các dự án lớn.</p><ul><li>Tiêu chuẩn: TCVN 6260:2009</li><li>Trọng lượng: 50kg/bao</li></ul>',
        metaTitle: 'Giá Xi Măng Xuân Thành PCB40 (Bao 50kg)',
        metaDescription: 'Cập nhật giá xi măng Xuân Thành PCB40 chính hãng. Sản phẩm chất lượng ổn định, cường độ cao, phù hợp cho bê tông, xây tô.'
    },
    {
        name: 'Thép Cuộn Phi 6 Việt Nhật',
        category: 'Sắt Thép Xây Dựng',
        price: 18500,
        images: [`${CLOUDINARY_BASE_URL}sat-viet-nhat-phi-6_i25zvy.webp`],
        description: '<h3>Ứng dụng</h3><p>Thép cuộn phi 6 (D6) của thương hiệu Việt Nhật được sử dụng rộng rãi trong việc làm đai bê tông cốt thép, gia công các chi tiết cơ khí và các cấu trúc khác.</p><p>Đơn vị tính: 1 kg</p>',
        metaTitle: 'Thép Cuộn Phi 6 (D6) Việt Nhật | Báo Giá Theo Kg',
        metaDescription: 'Báo giá thép cuộn phi 6 (D6) Việt Nhật mới nhất. Hàng chính hãng, chất lượng đảm bảo theo tiêu chuẩn, giá tốt cho đại lý và công trình.'
    },
    {
        name: 'Đá 1x2 Xanh Đồng Nai',
        category: 'Cát - Đá Xây Dựng',
        price: 380000,
        images: [`${CLOUDINARY_BASE_URL}giá-đá-xây-dựng-1x2-tại-Biên-Hòa-Đồng-Nai-1_sb52ja.webp`],
        description: '<h3>Thông tin đá 1x2</h3><p>Đá 1x2 là tên gọi của loại đá dăm có kích thước từ 10mm đến 28mm. Đây là cốt liệu chính dùng để đổ bê tông cho các công trình xây dựng.</p><p>Đơn vị tính: 1 mét khối (m3)</p>',
        metaTitle: 'Đá 1x2 Xanh Đồng Nai | Giá Đá Đổ Bê Tông Theo Khối',
        metaDescription: 'Cung cấp đá 1x2 xanh Đồng Nai chất lượng cao, cường độ tốt, chuyên dùng cho công tác đổ bê tông cột, dầm, sàn. Giao hàng tận nơi.'
    }
];

// Import data into DB
const importData = async () => {
    try {
        console.log('Xóa dữ liệu cũ...');
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Đã xóa dữ liệu cũ thành công.');

        console.log('Đang thêm danh mục...');
        const createdCategories = await Category.create(categories);
        console.log('Đã thêm danh mục thành công.');

        // Tạo một map để dễ dàng lấy ObjectId của category từ tên
        const categoryMap = createdCategories.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});

        // Gán đúng category ObjectId cho từng sản phẩm
        const productsToImport = products.map(product => {
            return {
                ...product,
                category: categoryMap[product.category]
            };
        });

        console.log('Đang thêm sản phẩm...');
        await Product.create(productsToImport); // Dùng create để middleware 'save' được chạy (tự tạo slug)
        
        console.log('---------------------------------');
        console.log('Dữ liệu đã được thêm thành công!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data from DB
const deleteData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();
        console.log('Dữ liệu đã được xóa thành công!');
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
