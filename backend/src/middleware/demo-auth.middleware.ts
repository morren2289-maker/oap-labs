import {
  Request,
  Response,
  NextFunction
} from "express";

import * as usersRepository
from "../repositories/users.repository";

export async function demoAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId =
    req.header("X-Demo-UserId");

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  const id = Number(userId);

  if (isNaN(id)) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  const user =
    await usersRepository.getById(id);

  if (!user) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  (req as any).currentUserId = id;
  console.log("header =", userId);
console.log("db user =", user);

  next();
}