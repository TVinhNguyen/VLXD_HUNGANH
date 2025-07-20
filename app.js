const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Tải biến môi trường
dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Kết nối DB thành công!'));

// Thiết lập View Engine là EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để parse body của request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
const pageRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

app.use('/', pageRoutes);
app.use('/san-pham', productRoutes); // URL thân thiện cho sản phẩm
app.use('/danh-muc', categoryRoutes); // URL thân thiện cho danh mục

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});