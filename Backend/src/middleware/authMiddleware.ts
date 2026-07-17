import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, UserRole } from "../types/auth";


// GUARD 1: Verify the user is logged in (Has a valid JWT)
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers["authorization"];

  // Expected format: Bearer token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Access Denied: No Token Provided!"
    });
    return;
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret_key"
    ) as JwtPayload;


    req.user = decoded;

    next();

  } catch (error) {

    res.status(403).json({
      message: "Access Denied: Invalid or Expired Token!"
    });
    return;

  }
};


// GUARD 2: Role-Based Access Control
export const authorizeRoles = (...allowedRoles: UserRole[]) => {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {


    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized: No user session found"
      });
      return;
    }


    if (!allowedRoles.includes(req.user.role)) {

      res.status(403).json({
        message: `Forbidden: You do not have permission (${req.user.role})`
      });

      return;
    }


    next();

  };
};