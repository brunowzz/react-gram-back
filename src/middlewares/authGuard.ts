import { NextFunction, Request, Response } from "express";
import "../types/express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ errors: ["Access denied. No token provided."] });
    return;
  }

  try {
    const verified = jwt.verify(token, jwtSecret);

    if (typeof verified === "object" && "id" in verified) {
      req.user = await User.findById(verified.id as string).select("-password");
      next();
    }
  } catch (error) {
    res.status(401).json({ errors: ["Access denied."] });
  }
}
