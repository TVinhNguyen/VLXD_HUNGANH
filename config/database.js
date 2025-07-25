import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Kết nối DB thành công!');
  } catch (error) {
    console.error('Không thể kết nối tới DB:', error);
    process.exit(1);
  }
};

export default connectDB;
