import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://neondb_owner:npg_2SB9QewPyHdM@ep-noisy-pond-a464rud5-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const testFetch = async () => {
  try {
    console.log('Connecting to DB...');
    await client.connect();
    console.log('Connected.');

    console.log('Fetching 5 rows from sales_data...');
    const res = await client.query('SELECT * FROM sales_data LIMIT 5');
    
    console.log(`Successfully fetched ${res.rows.length} rows.`);
    if (res.rows.length > 0) {
      console.log('First row sample:', JSON.stringify(res.rows[0], null, 2));
    } else {
      console.log('No rows found.');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
};

testFetch();
