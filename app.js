// Các import CommonJS cơ bản
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

// Tải biến môi trường
dotenv.config();

// Import Models của bạn
const Product = require('./models/Product.js');
const Category = require('./models/Category.js');

// Hàm async để khởi tạo và chạy server
const startServer = async () => {
  try {
    // --- SỬ DỤNG DYNAMIC IMPORT() ĐỂ TẢI CÁC GÓI ESM ---
    // Sử dụng import() động, trả về một Promise
    const { default: AdminJS } = await import('adminjs');
    const { default: AdminJSExpress } = await import('@adminjs/express');
    const { Database, Resource } = await import('@adminjs/mongoose');

    // Đăng ký adapter
    AdminJS.registerAdapter({ Database, Resource });

    const app = express();
    const PORT = process.env.PORT || 3000;
    const __dirname = path.resolve();

    // --- KẾT NỐI DATABASE TRƯỚC TIÊN ---
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Kết nối DB thành công!');

    // Cấu hình Express
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // --- CẤU HÌNH ADMINJS ---
    const adminOptions = {
      resources: [
        { 
          resource: Product, 
          options: {
            properties: {
              description: { type: 'richtext' },
              images: { type: 'textarea' }
            }
          } 
        },
        { resource: Category },
      ],
      rootPath: '/admin',
      branding: {
        companyName: 'Quản trị VLXD Hùng Anh',
        softwareBrothers: false,
      },
    };

    const admin = new AdminJS(adminOptions);
    const adminRouter = AdminJSExpress.buildRouter(admin);

    // Cấu hình session
    app.use(session({
      secret: 'day-la-mot-chuoi-bi-mat-rat-dai-va-an-toan-hay-thay-doi-no',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
      }
    }));
    
    app.use(admin.options.rootPath, adminRouter);
    
    // --- CÁC ROUTES CỦA WEBSITE CHÍNH ---
    const pageRoutes = require('./routes/index.js');
    const productRoutes = require('./routes/products.js');
    const categoryRoutes = require('./routes/categories.js');
    
    app.use('/', pageRoutes);
    app.use('/san-pham', productRoutes);
    app.use('/danh-muc', categoryRoutes);

    // --- KHỞI ĐỘNG SERVER ---
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên port ${PORT}`);
      console.log(`AdminJS đã khởi động tại http://localhost:${PORT}${admin.options.rootPath}`);
    });

  } catch (error) {
    console.error("Không thể khởi động server:", error);
    process.exit(1);
  }
};

// Gọi hàm để bắt đầu
startServer();