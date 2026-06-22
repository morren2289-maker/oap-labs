import {
  Request,
  Response,
  NextFunction
} from "express";

type AppError = {
  status?: number;
  code?: string;
  message?: string;
  details?: unknown;
};

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;

  return res.status(status).json({
    code: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "Internal server error",
    details: err.details
  });
}