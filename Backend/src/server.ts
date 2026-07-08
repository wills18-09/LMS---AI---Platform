import { testDbConnection } from './config/db';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load our secret environment variables (we will make this file next!)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable our security guard (CORS) and allow our server to read JSON data
app.use(cors());
app.use(express.json());

// A simple test route to make sure the server is awake
app.get('/', (req, res) => {
  res.send('LMS-AI Core Backend is running perfectly!');
});

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server is happily running on http://localhost:${PORT}`);
  
  // Test our database connection right away!
  await testDbConnection();
});