import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const saleSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: false
});

const Sale = mongoose.model('Sale', saleSchema, 'sales');

const cleanDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('✓ MongoDB Connected');

    const existingCount = await Sale.countDocuments();
    console.log(`📊 Current records: ${existingCount}`);

    if (existingCount > 0) {
      console.log('🗑️  Deleting all records...');
      const result = await Sale.deleteMany({});
      console.log(`✓ Deleted ${result.deletedCount} records`);
    }

    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cleanDatabase();
