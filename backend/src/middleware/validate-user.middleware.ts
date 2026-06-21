import {
  Request,
  Response,
  NextFunction
} from "express";

export function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const {
    name,
    email
  } = req.body;

  if (
    !name ||
    !email
  ) {

    return res.status(400).json({

      code: 400,

      message:
        "Name and email are required"
    });
  }

  next();
}