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

const generateSalesData = (count = 50) => {
      const regions = ['North', 'South', 'East', 'West'];
      const genders = ['Male', 'Female', 'Other'];
      const categories = ['Clothing', 'Beauty', 'Electronics', 'Food'];
      const paymentMethods = ['UPI', 'Cash', 'Card', 'Net Banking'];
      const tags = ['organic', 'skincare', 'premium'];
      const employees = ['John Doe', 'Jane Smith', 'Mike Johnson'];
      const customerNames = ['Raj Kumar', 'Priya Singh', 'Amit Patel'];

      const sales = [];

      for (let i = 0; i < count; i++) {
            const date = new Date(2024, 0, 1 + Math.floor(Math.random() * 365));
            const quantity = Math.floor(Math.random() * 10) + 1;
            const unitPrice = Math.floor(Math.random() * 5000) + 100;
            const totalAmount = quantity * unitPrice;
            const discountPercent = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0;
            const finalAmount = totalAmount * (1 - discountPercent / 100);

            sales.push({
                  'Transaction ID': `TXN${String(i + 1).padStart(7, '0')}`,
                  Date: date,
                  'Customer ID': `CUST${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
                  'Customer Name': customerNames[i % customerNames.length],
                  'Phone Number': `+919${Math.floor(Math.random() * 1000000000)}`,
                  Gender: genders[i % genders.length],
                  Age: 25 + (i % 40),
                  'Product Category': categories[i % categories.length],
                  'Product ID': `PROD${String(i).padStart(4, '0')}`,
                  'Employee Name': employees[i % employees.length],
                  Quantity: quantity,
                  'Unit Price': unitPrice,
                  'Total Amount': totalAmount,
                  'Discount %': discountPercent,
                  'Final Amount': finalAmount,
                  'Customer Region': regions[i % regions.length],
                  'Payment Method': paymentMethods[i % paymentMethods.length],
                  Tags: tags[i % tags.length],
                  Status: 'Completed'
            });
      }

      return sales;
};

const seedSmallDatabase = async () => {
      try {
            const uri = process.env.MONGODB_URI?.trim();
            if (!uri) {
                  throw new Error('MONGODB_URI is not defined in .env file');
            }

            console.log('🔗 Connecting to MongoDB...');
            await mongoose.connect(uri, {
                  serverSelectionTimeoutMS: 5000
            });

            console.log('✓ MongoDB Connected');

            const existingCount = await Sale.countDocuments();
            console.log(`📊 Existing records: ${existingCount}`);

            if (existingCount > 0) {
                  console.log('⚠️  Clearing existing data...');
                  await Sale.deleteMany({});
            }

            console.log('📝 Generating 50 sample sales records...');
            const salesData = generateSalesData(50);

            console.log('💾 Inserting data into MongoDB...');
            const result = await Sale.insertMany(salesData, { ordered: false });
            console.log(`✓ Successfully inserted ${result.length} records`);

            const finalCount = await Sale.countDocuments();
            console.log(`✅ Final record count: ${finalCount}`);

            await mongoose.disconnect();
            console.log('\n✓ Disconnected from MongoDB');
            console.log('🎉 Ready to test! Start the application now.');
      } catch (error) {
            console.error('❌ Error:', error.message);
            if (error.message.includes('quota')) {
                  console.error('\n⚠️  MongoDB Storage Quota Exceeded');
                  console.error('Fix: Go to MongoDB Atlas dashboard and:');
                  console.error('  1. Delete old backups');
                  console.error('  2. Delete old collections');
                  console.error('  3. Or upgrade your plan');
            }
            process.exit(1);
      }
};

seedSmallDatabase();
