import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type TokenPayload = {
  sub: string;
  role: "admin" | "editor";
};

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const [, token] = header.split(" ");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
