import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file. Please create a .env file in the backend directory with MONGODB_URI, PORT, and FRONTEND_URL.');
    }
    
    const uri = process.env.MONGODB_URI.trim();
    if (!uri || uri === '') {
      throw new Error('MONGODB_URI is empty in .env file.');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (error.message.includes('authentication')) {
      console.error('Please check your MongoDB Atlas credentials in .env file');
    } else if (error.message.includes('timeout')) {
      console.error('Connection timeout. Please check your network connection and MongoDB Atlas IP whitelist.');
    }
    process.exit(1);
  }
};

export default connectDB;
