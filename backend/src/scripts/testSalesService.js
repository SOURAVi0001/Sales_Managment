import { getSales } from '../services/salesService.js';
import { sequelize } from '../utils/database.js';

const testService = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected.');

    console.log('Testing getSales service...');
    const result = await getSales({
      page: 1,
      limit: 5,
      sortBy: 'date-desc',
      filters: {}
    });

    console.log('getSales result:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error testing service:', error);
  } finally {
    await sequelize.close();
  }
};

testService();
