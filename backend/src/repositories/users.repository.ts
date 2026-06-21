import {
  CreateUserRequestDto
}
from "../dtos/create-user-request.dto";
import {
  UpdateUserRequestDto
}
from "../dtos/update-user-request.dto";
interface User {
  id: number;
  name: string;
  email: string;
}

let nextId = 1;

const users: User[] = [];

export function getAll(
  search?: string
)
{

  if (!search) {
    return users;
  }

  return users.filter(
    user =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );
}

export function create(
  data: CreateUserRequestDto
) {

  const user: User = {

  id: nextId++,

  name: data.name,

  email: data.email
};

  users.push(user);

  return user;
}

export function update(
  id: number,
  data: UpdateUserRequestDto
) {

  const user =
    users.find(
      user => user.id === id
    );

  if (!user) {
    throw {
    status: 404,
    message: "User not found"
  };
  }

  user.name =
    data.name;

  user.email =
    data.email;

  return user;
}

export function remove(
  id: number
) {

  const index =
    users.findIndex(
      user => user.id === id
    );

  if (index === -1) {

    throw {
  status: 404,
  message: "User not found"
};
  }

  users.splice(index, 1);
}
export function findByEmail(
  email: string
) {

  return users.find(
    user =>
      user.email === email
  );
}