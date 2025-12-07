import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const cleanAllCollections = async () => {
  try {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✓ MongoDB Connected');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`📚 Found ${collections.length} collections`);

    for (const collection of collections) {
      const collName = collection.name;
      const count = await db.collection(collName).countDocuments();
      console.log(`  - ${collName}: ${count} documents`);
      
      if (count > 0) {
        await db.collection(collName).deleteMany({});
        console.log(`    ✓ Cleared ${collName}`);
      }
    }

    await mongoose.disconnect();
    console.log('\n✓ All collections cleaned!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cleanAllCollections();
