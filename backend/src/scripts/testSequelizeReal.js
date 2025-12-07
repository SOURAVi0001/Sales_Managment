import { sequelize } from '../utils/database.js';

console.log('Starting testSequelizeReal...');

const test = async () => {
  try {
    console.log('Authenticating...');
    await sequelize.authenticate();
    console.log('Authenticated!');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await sequelize.close();
  }
};

test();
