const fs = require('fs');
const { Pool } = require('pg');
const csv = require('csv-parser');

const connectionString = "postgresql://neondb_owner:npg_2SB9QewPyHdM@ep-noisy-pond-a464rud5-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
const filePath = '/mnt/c/Users/SANSKAAAR/Downloads/truestate_assignment_dataset.csv';

const pool = new Pool({ connectionString });

async function uploadData() {
  const client = await pool.connect();
  console.log("Connected. Reading and inserting data (Batching)...");

  let batch = [];
  const BATCH_SIZE = 500; // Insert 500 rows at a time
  let totalRows = 0;

  const insertBatch = async (rows) => {
    if (rows.length === 0) return;
    
    // Create placeholders ($1, $2...), ($26, $27...)...
    const values = rows.map(r => Object.values(r));
    const flatValues = values.flat();
    
    // Generate the $1, $2 syntax dynamically
    let query = `INSERT INTO sales_data VALUES `;
    const rowPlaceholders = [];
    let paramIndex = 1;
    
    for (let i = 0; i < rows.length; i++) {
      let placeholders = [];
      // Ensure we only take the first 25 columns if CSV has extra
      const rowKeys = Object.keys(rows[i]).slice(0, 25); 
      
      for (let j = 0; j < rowKeys.length; j++) {
        placeholders.push(`$${paramIndex++}`);
      }
      rowPlaceholders.push(`(${placeholders.join(',')})`);
    }
    
    query += rowPlaceholders.join(',');

    try {
      await client.query(query, flatValues);
    } catch (err) {
      console.error("Batch failed:", err.message);
      // Optional: Log the failing row content to debug
    }
  };

  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    // Sanitize: ensure empty strings for empty fields, not undefined
    const cleanRow = {};
    Object.keys(row).slice(0, 25).forEach(k => cleanRow[k] = row[k] || null);
    
    batch.push(cleanRow);
    totalRows++;

    if (batch.length >= BATCH_SIZE) {
      await insertBatch(batch);
      process.stdout.write(`\rRows processed: ${totalRows}`);
      batch = [];
    }
  }

  // Insert remaining
  if (batch.length > 0) await insertBatch(batch);

  console.log(`\n✅ Upload complete! Total rows: ${totalRows}`);
  client.release();
  pool.end();
}

uploadData();