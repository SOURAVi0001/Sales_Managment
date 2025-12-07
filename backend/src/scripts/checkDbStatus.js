import { sequelize } from '../utils/database.js';

async function checkDb() {
  try {
    console.log('Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // Check tables
    const [tables] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log('\n📊 Tables found:', tables.map(t => t.table_name));

    // Check sales_data columns specifically
    const [columns] = await sequelize.query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'sales_data';"
    );
    
    if (columns.length > 0) {
      console.log('\n📋 Columns in sales_data:');
      console.table(columns);
      
      // Check row count
      const [rows] = await sequelize.query('SELECT COUNT(*) FROM sales_data');
      console.log(`\n🔢 Total rows in sales_data: ${rows[0].count}`);
    } else {
      console.log('\n⚠️ Table sales_data does not exist or has no columns.');
    }

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

checkDb();
