import 'dotenv/config'; // 🔥 FIX: This MUST be the absolute first line. It loads secrets instantly!
import express, { Request, Response } from 'express';
import pool from './db';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔍 [DEBUG] Database URL from env is:", process.env.DATABASE_URL);

app.use(express.json());

// Attach our registration links under the prefix "/api/auth"
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('LMS AI Platform Backend Engine is running smoothly.');
});

async function assertDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`🚀 [Database]: Connection established successfully at ${result.rows[0].now}`);
  } catch (error) {
    console.error('❌ [Database]: Connection initialization failed!');
    console.error(error);
    process.exit(1);
  }
}

app.listen(PORT, async () => {
  console.log(`⚡ [Server]: Server is currently listening on port ${PORT}`);
  await assertDatabaseConnection();
});