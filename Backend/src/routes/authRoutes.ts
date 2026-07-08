import { Router, Request, Response, RequestHandler } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public Routes (Anyone can access)
router.post('/register', register as unknown as RequestHandler);
router.post('/login', login as unknown as RequestHandler);

// 🔒 PROTECTED STUDENT ROUTE (Requires valid login token)
router.get('/dashboard', authenticateToken as unknown as RequestHandler, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Student Dashboard! Your data is safe.' });
});

export default router;