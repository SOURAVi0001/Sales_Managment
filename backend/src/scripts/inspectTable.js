
import { sequelize } from '../utils/database.js';

const inspect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected.');
    const table = await sequelize.getQueryInterface().describeTable('sales_data');
    console.log(JSON.stringify(table, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
};

inspect();
