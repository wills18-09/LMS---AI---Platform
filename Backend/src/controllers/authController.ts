import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/index';

// 1. REGISTRATION (With Password Hashing)
export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password) {
       res.status(400).json({ message: 'Email and password are required' });
       return;
    }

    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
       res.status(400).json({ message: 'A user with this email already exists' });
       return;
    }

    // 🔥 SECURITY UPGRADE: Scramble the password using Bcrypt with 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the HASHED password, never the plain text!
    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role) 
       VALUES ($1, $2, $3, $4, 'student') 
       RETURNING id, email, role`,
      [email, hashedPassword, firstName, lastName] 
    );

    res.status(201).json({
      message: 'User registered securely!',
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// 2. LOGIN (Verify Password & Give JWT Passport)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user even exists in our database
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
       res.status(400).json({ message: 'Invalid credentials (User not found)' });
       return;
    }

    const user = userResult.rows[0];

    // Compare the incoming typed password with the scrambled hash in our database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials (Wrong password)' });
       return;
    }

    // Create a JWT Token (This acts like a digital passport for logged-in users)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret_key', // Used to sign the passport securely
      { expiresIn: '1d' } // Passport expires in 1 day
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};