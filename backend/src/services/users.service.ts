import * as usersRepository
from "../repositories/users.repository";

import {
  UpdateUserRequestDto
}
from "../dtos/update-user-request.dto";

import {
  CreateUserRequestDto
}
from "../dtos/create-user-request.dto";

export function getAllUsers(
  search?: string
)
{

  return usersRepository.getAll(
    search
  );
}
export function createUser(
  dto: CreateUserRequestDto
)
{

  if (
    !dto.name ||
    !dto.email
  ) {

    throw {
      status: 400,
      message:
        "Name and email are required"
    };
  }

  const existingUser =
    usersRepository.findByEmail(
      dto.email
    );

  if (existingUser) {

    throw {
      status: 409,
      message:
        "User already exists"
    };
  }

  return usersRepository.create(dto);
}
export function update(
  id: number,
  data: UpdateUserRequestDto
) {

  return usersRepository.update(
    id,
    data
  );
}

export function remove(
  id: number
) {

  return usersRepository.remove(
    id
  );
}