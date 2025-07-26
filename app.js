import express from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import { admin, adminRouter } from './config/admin.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const __dirname = path.resolve();

// Express configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'a-very-long-and-secure-secret-key-that-you-should-change',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  }
}));

// AdminJS router
app.use(admin.options.rootPath, adminRouter);

// Website routes
import pageRoutes from './routes/index.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import contactRoutes from './routes/contact.js';
import aboutRoutes from './routes/about.js';

app.use('/', pageRoutes);
app.use('/san-pham', productRoutes);
app.use('/danh-muc', categoryRoutes);
app.use('/lien-he', contactRoutes);
app.use('/gioi-thieu', aboutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
