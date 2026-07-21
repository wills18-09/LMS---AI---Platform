import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, UserRole } from "../types/auth";


// Custom Express Request with authenticated user
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}



// GUARD 1: Verify JWT
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;




  const token = authHeader?.split(" ")[1];


  if (!token) {

    return res.status(401).json({
      message: "Access Denied: No Token Provided!"
    });

  }


  try {

    

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;


    


    req.user = decoded;


    next();


  } catch (error) {


    


    return res.status(403).json({
      message: "Access Denied: Invalid or Expired Token!"
    });

  }

};




// GUARD 2: Role Based Access Control

export const authorizeRoles = (
  ...allowedRoles: UserRole[]
) => {


  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {


    


    if (!req.user) {

      return res.status(401).json({
        message: "Unauthorized: No user session found"
      });

    }



    if (
      !allowedRoles.includes(
        req.user.role
      )
    ) {

      return res.status(403).json({

        message:
          `Forbidden: Role ${req.user.role} not allowed`

      });

    }


    next();

  };

};