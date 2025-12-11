import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

type ApiError = Error & { status?: number };

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status ?? 500;
  if (status >= 500) {
    logger.error({ err }, "Unexpected server error");
  }

  res.status(status).json({
    error: err.message ?? "Unexpected error",
  });
};
