import { all, get, run } from "../db/dbClient";

import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { UpdateUserRequestDto } from "../dtos/update-user-request.dto";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export async function getAll(search?: string) {
  let sql = `
    SELECT *
    FROM Users
  `;

  if (search) {
    sql += `
      WHERE name LIKE '%${search}%'
    `;
  }

  sql += `
    ORDER BY id DESC;
  `;

  return await all<User>(sql);
}

export async function getById(id: number) {
  return await get<User>(`
    SELECT *
    FROM Users
    WHERE id = ${id};
  `);
}

export async function create(
  data: CreateUserRequestDto
) {
  const now = new Date().toISOString();

  const result = await run(`
    INSERT INTO Users(name, email, createdAt)
    VALUES(
      '${data.name}',
      '${data.email}',
      '${now}'
    );
  `);

  return await getById(result.lastID);
}

export async function update(
  id: number,
  data: UpdateUserRequestDto
) {
  const result = await run(`
    UPDATE Users
    SET
      name='${data.name}',
      email='${data.email}'
    WHERE id=${id};
  `);

  if (result.changes === 0) {
    return null;
  }

  return await get<User>(`
    SELECT *
    FROM Users
    WHERE id=${id};
  `);
}

export async function remove(
  id: number
) {
  const result = await run(`
    DELETE FROM Users
    WHERE id=${id};
  `);

  return result.changes > 0;
}

export async function findByEmail(
  email: string
) {
  return await get<User>(`
    SELECT *
    FROM Users
    WHERE email='${email}';
  `);
}