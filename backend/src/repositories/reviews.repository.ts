import { all, get, run } from "../db/dbClient";

import {
  CreateReviewRequestDto
} from "../dtos/create-review-request.dto";

import {
  UpdateReviewRequestDto
} from "../dtos/update-review-request.dto";
type ReviewRow = {
  id: number;
  resourceId: number;
  userId: number;
  text: string;
  rating: number;
  createdAt: string;
};

export async function getAll(
  resourceId?: number
) {
  let sql = `
    SELECT *
    FROM Reviews
  `;

  if (resourceId) {
  return await all(
    `
    SELECT *
    FROM Reviews
    WHERE resourceId = ?
    ORDER BY id DESC;
    `,
    [resourceId]
  );
}

return await all(`
  SELECT *
  FROM Reviews
  ORDER BY id DESC;
`);

}

export async function getById(
  id: number
): Promise<ReviewRow | null> {
return await get(
  `
  SELECT *
  FROM Reviews
  WHERE id = ?;
  `,[id]
) as ReviewRow | null;
}

export async function create(
  dto: CreateReviewRequestDto
) {
  const result = await run(
  `
  INSERT INTO Reviews
  (
    resourceId,
    userId,
    text,
    rating,
    createdAt
  )
  VALUES (?, ?, ?, ?, ?);
  `,
  [
    dto.resourceId,
    dto.userId,
    dto.text,
    dto.rating,
    new Date().toISOString()
  ]
);

  return await getById(result.lastID);
}

export async function update(
  id: number,
  dto: UpdateReviewRequestDto
) {
  const current = await getById(id);

  if (!current) {
    return null;
  }

  const text = dto.text ?? current.text;
  const rating = dto.rating ?? current.rating;

  await run(
  `
  UPDATE Reviews
  SET
    text = ?,
    rating = ?
  WHERE id = ?;
  `,
  [text, rating, id]
);

  return await getById(id);
}

export async function remove(
  id: number
) {
  const result = await run(`
    DELETE FROM Reviews
WHERE id = ?;
  `, [id]);

  return result.changes > 0;
}
export async function getByIdForUser(
  reviewId: number,
  userId: number
) {
  return await get(
    `
    SELECT *
    FROM Reviews
    WHERE id = ?
      AND userId = ?;
    `,
    [reviewId, userId]
  );
}