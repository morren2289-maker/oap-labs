import {
  Request,
  Response,
  NextFunction
} from "express";

export function errorHandler(
  err: Error & {
  status?: number;
  code?: string;
},
  req: Request,
  res: Response,
  next: NextFunction
) {

  return res.status(
    err.status || 500
  ).json({

    code:
    err.status || 500,

  message:
    err.message ||
    "Internal server error"
  });
}