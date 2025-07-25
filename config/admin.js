import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

AdminJS.registerAdapter({ Database, Resource });

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

export { admin, adminRouter };
