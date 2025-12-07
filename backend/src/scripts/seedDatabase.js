import { sequelize } from '../utils/database.js';
import Sale from '../models/Sale.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const generateSalesData = (count = 1000) => {
      const regions = ['North', 'South', 'East', 'West'];
      const genders = ['Male', 'Female', 'Other'];
      const categories = ['Clothing', 'Beauty', 'Electronics', 'Food'];
      const paymentMethods = ['UPI', 'Cash', 'Card', 'Net Banking'];
      const tags = ['organic', 'skincare', 'premium', 'budget', 'new'];
      const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];
      const customerNames = ['Raj Kumar', 'Priya Singh', 'Amit Patel', 'Neha Gupta', 'Vikas sharma', 'Anjali Das', 'Rohan Singh', 'Deepika Nair'];

      const sales = [];

      for (let i = 0; i < count; i++) {
            const date = new Date(2023, 0, 1 + Math.floor(Math.random() * 365));
            const quantity = Math.floor(Math.random() * 10) + 1;
            const unitPrice = Math.floor(Math.random() * 5000) + 100;
            const totalAmount = quantity * unitPrice;
            const discountPercent = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0;
            const finalAmount = totalAmount * (1 - discountPercent / 100);

            sales.push({
                  transactionId: `TXN${String(i + 1).padStart(7, '0')}`,
                  date: date,
                  customerId: `CUST${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
                  customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
                  phoneNumber: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                  gender: genders[Math.floor(Math.random() * genders.length)],
                  age: Math.floor(Math.random() * 50) + 18,
                  productCategory: categories[Math.floor(Math.random() * categories.length)],
                  productId: `PROD${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
                  employeeName: employees[Math.floor(Math.random() * employees.length)],
                  quantity: quantity,
                  unitPrice: unitPrice,
                  totalAmount: totalAmount,
                  discountPercent: discountPercent,
                  finalAmount: finalAmount,
                  customerRegion: regions[Math.floor(Math.random() * regions.length)],
                  paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                  tags: tags[Math.floor(Math.random() * tags.length)],
                  status: 'Completed'
            });
      }

      return sales;
};

const seedDatabase = async () => {
      try {
            await sequelize.authenticate();
            console.log('✓ PostgreSQL Connected');
            
            await sequelize.sync({ force: true }); // Recreate tables
            console.log('✓ Database synced');

            // Generate and insert data
            console.log('📝 Generating 100 sample sales records...');
            const salesData = generateSalesData(100);

            console.log('💾 Inserting data into PostgreSQL...');
            const result = await Sale.bulkCreate(salesData);
            console.log(`✓ Successfully inserted ${result.length} records`);

            // Verify insertion
            const finalCount = await Sale.count();
            console.log(`✅ Final record count: ${finalCount}`);

            process.exit(0);
      } catch (error) {
            console.error('Error seeding database:', error);
            process.exit(1);
      }
};

seedDatabase();
