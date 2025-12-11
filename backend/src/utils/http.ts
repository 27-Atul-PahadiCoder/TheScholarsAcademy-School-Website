import type { Response } from "express";

export const sendSuccess = <T>(res: Response, payload: T, status = 200) =>
  res.status(status).json({ data: payload });
