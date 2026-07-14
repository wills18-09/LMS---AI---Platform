import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tell TypeScript that our Request object can hold our decoded user data
export interface AuthenticatedRequest<P = {}> extends Request<P> {
  user?: {
    id: string;
    role: string;
  };
}

// GUARD 1: Verify the user is logged in (Has a valid ticket)
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Grab the Authorization header from the request
  const authHeader = req.headers['authorization'];
  // Bearer tokens look like: "Bearer eyJhbGciOi..." -> We split by space and take the second part
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
     res.status(401).json({ message: 'Access Denied: No Token Provided!' });
     return;
  }

  try {
    // Verify token hasn't been tampered with
    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || 'fallback_secret_key'
) as {
    id: string;
    role: string;
};
    
    // Attach the user's details to the request object so future routes know who this is
    req.user = decoded;
    
    // Pass the user to the next step in the pipeline!
    next();
  } catch (error) {
     res.status(403).json({ message: 'Access Denied: Invalid or Expired Token!' });
     return;
  }
};

// GUARD 2: Role-Based Access Control (Check their security clearance)
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
       res.status(401).json({ message: 'Unauthorized: No user session found' });
       return;
    }

    // Check if the user's role is on the approved list (e.g., 'admin', 'instructor')
    if (!allowedRoles.includes(req.user.role)) {
       res.status(403).json({ message: `Forbidden: You do not have permission (${req.user.role})` });
       return;
    }

    next();
  };
};