import { Pool } from 'pg';
import dotenv from 'dotenv';

// Make sure our environment variables from the .env file are fully loaded
dotenv.config();

// Create a connection pool using the credentials from your secret vault (.env)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// A quick helper function to test if the database connection is working
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connection established successfully!');
    
    // Force enable the vector extension
    await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
    
    // Check for either 'vector' or 'pgvector' in the system extensions
    const result = await client.query(
      "SELECT extname FROM pg_extension WHERE extname = 'vector' OR extname = 'pgvector';"
    );
    
    if (result.rows.length > 0) {
      console.log('🧠 AI pgvector extension is active and ready!');
    } else {
      console.log('⚠️ Postgres connected, but pgvector extension is not initialized yet.');
    }
    
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};
export default pool;