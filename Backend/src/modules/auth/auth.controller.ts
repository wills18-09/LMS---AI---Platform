import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../db/index';

// 1. REGISTRATION (Atomic Transaction)
export const register = async (req: Request, res: Response) => {
  console.log("REGISTER HIT");
  console.log(req.body);

  const { email, password, full_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Get a dedicated client from the pool for the transaction
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Check if user exists
    const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1. Insert User
    const userRes = await client.query(
  `INSERT INTO users (email, password_hash, full_name) 
   VALUES ($1, $2, $3) RETURNING id`,
  [email, hashedPassword, full_name]
);

const newUserId = userRes.rows[0].id;

await client.query(
  'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
  [newUserId, 1]
);

  

    await client.query('COMMIT'); // Commit transaction
    res.status(201).json({ message: 'User registered securely with role!' });

  } catch (error) {
  await client.query('ROLLBACK');
  console.log("REGISTER FAILED");
  console.error(error);
    
    res.status(500).json({ message: 'Server error during registration' });
  } finally {
    client.release(); // Release client back to pool
  }
};

// 2. LOGIN (With SQL JOIN)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Join users, user_roles, and roles to get the role name
    const query = `
      SELECT u.*, r.name as role_name 
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.email = $1
    `;
    
    const userResult = await pool.query(query, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT with the role from the join
    const accessToken = jwt.sign(
  { id: user.id, role: user.role_name },
  process.env.JWT_SECRET!,
  { expiresIn: '15m' }
);

const refreshToken = jwt.sign(
  { id: user.id },
  process.env.JWT_REFRESH_SECRET!,
  { expiresIn: '7d' }
);

await pool.query(
  `INSERT INTO refresh_tokens (user_id, token, expires_at)
   VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
  [user.id, refreshToken]
);

    res.status(200).json({
  access_token: accessToken,
  refresh_token: refreshToken,
  user: {
    id: user.id,
    full_name: user.full_name,
    role: user.role_name
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({
      message: "Refresh token required"
    });
  }

  try {
    const tokenResult = await pool.query(
      `SELECT * FROM refresh_tokens 
       WHERE token = $1`,
      [refresh_token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET!,
      async (err: any, decoded: any) => {

        if (err) {
          return res.status(403).json({
            message: "Expired refresh token"
          });
        }

        const userResult = await pool.query(
          `SELECT u.id, r.name as role
           FROM users u
           JOIN user_roles ur ON u.id = ur.user_id
           JOIN roles r ON ur.role_id = r.id
           WHERE u.id = $1`,
          [decoded.id]
        );

        const user = userResult.rows[0];

        const newAccessToken = jwt.sign(
          {
            id: user.id,
            role: user.role
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "15m"
          }
        );

        res.json({
          access_token: newAccessToken
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    await pool.query(
      `DELETE FROM refresh_tokens WHERE token = $1`,
      [refresh_token]
    );

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const result = await pool.query(
      `SELECT id, full_name, email 
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};