import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, UserRole } from "../types/auth";


// GUARD 1: Verify JWT
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  console.log("🔥 AUTH HEADER:", authHeader);


  const token = authHeader?.split(" ")[1];


  if (!token) {

    return res.status(401).json({
      message: "Access Denied: No Token Provided!"
    });

  }


  try {

    console.log(
      "🔥 JWT SECRET EXISTS:",
      !!process.env.JWT_SECRET
    );


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;


    console.log(
      "🔥 DECODED USER:",
      decoded
    );


    req.user = decoded;


    next();


  } catch (error) {


    console.error(
      "🔥 JWT VERIFY ERROR:",
      error
    );


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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {


    console.log(
      "🔥 USER FROM TOKEN:",
      req.user
    );


    console.log(
      "🔥 REQUIRED ROLES:",
      allowedRoles
    );


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