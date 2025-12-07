import { Sequelize } from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });
dotenv.config({ path: join(__dirname, '../../backend/.env') });

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_2SB9QewPyHdM@ep-noisy-pond-a464rud5-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully via Sequelize');
    // Sync disabled
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize };
export default connectDB;
