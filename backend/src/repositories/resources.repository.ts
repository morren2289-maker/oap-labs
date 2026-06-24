import { all, get, run } from "../db/dbClient";

import {
  CreateResourceRequestDto
} from "../dtos/create-resource-request.dto";

import {
  UpdateResourceRequestDto
} from "../dtos/update-resource-request.dto";
type ResourceRow = {
  id: number;
  title: string;
  author: string;
  type: string;
  rating: number;
  comment: string;
  createdAt: string;
};
export async function getAll(
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortDir?: string
) {
  let sql = `
    SELECT *
    FROM Resources
    WHERE rating >= 1
  `;
  const allowedSortFields = [
    "id",
    "title",
    "author",
    "type",
    "rating",
    "createdAt"
  ];
  if (sortBy && allowedSortFields.includes(sortBy)) {
    const direction = sortDir === "desc" ? "DESC" : "ASC";

    sql += `
      ORDER BY ${sortBy} ${direction}
    `;
  } else {
    sql += `
      ORDER BY id DESC
    `;
  }
  if (page && pageSize) {
    const offset = (page - 1) * pageSize;
    sql += `
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }

  sql += ";";

  return await all(sql);
}

export async function getById(
  id: number
): Promise<ResourceRow | null> {

  return await get(`
    SELECT *
    FROM Resources
    WHERE id = ?
  `,[id])as ResourceRow | null;
}

export async function create(
  dto: CreateResourceRequestDto
) {
  const result = await run(`
    INSERT INTO Resources
    (
      title,
      author,
      type,
      rating,
      comment,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?);
  `, [
 dto.title,
 dto.author,
 dto.type,
 dto.rating,
 dto.comment ?? "",
 new Date().toISOString()
]);

  return await getById(result.lastID);
}

export async function update(
  id: number,
  dto: UpdateResourceRequestDto
) {

  const result = await run(
  `
  UPDATE Resources
  SET
    title = ?,
    author = ?,
    type = ?,
    rating = ?,
    comment = ?
  WHERE id = ?;
  `,
  [
    dto.title,
    dto.author,
    dto.type,
    dto.rating,
    dto.comment,
    id
  ]
);

  if (result.changes === 0) {
    return null;
  }

  return await getById(id);
}

export async function remove(
  id: number
) {

  const result = await run(
  `
  DELETE FROM Resources
  WHERE id = ?;
  `,
  [id]
);

  return result.changes > 0;
}
export async function getResourcesWithReviews() {
  return await all(`
    SELECT
      r.id as resourceId,
      r.title,
      r.author,
      r.type,
      r.rating as resourceRating,
      rv.id as reviewId,
      rv.text as reviewText,
      rv.rating as reviewRating,
      u.name as userName
    FROM Resources r
    LEFT JOIN Reviews rv
      ON rv.resourceId = r.id
    LEFT JOIN Users u
      ON u.id = rv.userId
    ORDER BY r.id DESC;
  `);
}
export async function getAverageRating() {

  return await get(`
    SELECT
      AVG(rating) as avgRating,
      COUNT(*) as totalResources
    FROM Resources;
  `);

}
export async function patch(
  id: number,
  dto: UpdateResourceRequestDto
) {
  const current = await getById(id);

  if (!current) {
    return null;
  }

  const title = dto.title ?? current.title;
  const author = dto.author ?? current.author;
  const type = dto.type ?? current.type;
  const rating = dto.rating ?? current.rating;
  const comment = dto.comment ?? current.comment ?? "";

  await run(
  `
  UPDATE Resources
  SET
    title = ?,
    author = ?,
    type = ?,
    rating = ?,
    comment = ?
  WHERE id = ?;
  `,
  [
    title,
    author,
    type,
    rating,
    comment,
    id
  ]
);

  return await getById(id);
}
