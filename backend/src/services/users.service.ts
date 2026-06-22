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

export async function getAllUsers(
  search?: string
) {
  return await usersRepository.getAll(search);
}

export async function createUser(
  dto: CreateUserRequestDto
) {
  if (
    !dto.name ||
    !dto.email
  ) {
    throw {
      status: 400,
      message: "Name and email are required"
    };
  }

  const existingUser =
    await usersRepository.findByEmail(
      dto.email
    );

  if (existingUser) {
    throw {
      status: 409,
      message: "User already exists"
    };
  }

  return await usersRepository.create(dto);
}
export async function getUserById(
  id: number
) {
  const user = await usersRepository.getById(id);

  if (!user) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "User not found"
    };
  }

  return user;
}
export async function update(
  id: number,
  data: UpdateUserRequestDto
) {
  if (
    !data.name ||
    !data.email
  ) {
    throw {
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Name and email are required"
    };
  }

  const updated =
    await usersRepository.update(
      id,
      data
    );

  if (!updated) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "User not found"
    };
  }

  return updated;
}

export async function remove(
  id: number
) {
  const deleted = await usersRepository.remove(id);

  if (!deleted) {
    throw {
      status: 404,
      message: "User not found"
    };
  }

  return deleted;
}