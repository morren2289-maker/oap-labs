import { Request, Response }
from "express";

import * as usersService
from "../services/users.service";
export function getAll(
  req: Request,
  res: Response
) {

  const search =
    req.query.search as string;

  const users =
    usersService.getAllUsers(
      search
    );

  return res.status(200).json({
    items: users
  });
}
export function create(
  req: Request,
  res: Response
) {

  const user =
    usersService.createUser(
      req.body
    );

  return res
  .status(201)
  .json({
    data: user
  });
}
export function update(
  req: Request,
  res: Response
) {

  const updatedUser =
    usersService.update(
      Number(req.params.id),
      req.body
    );

 return res.status(200).json({
  data: updatedUser
});
}

export function remove(
  req: Request,
  res: Response
) {

  usersService.remove(
    Number(req.params.id)
  );

  return res
    .status(204)
    .send();
}
