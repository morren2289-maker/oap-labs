import {
  Request,
  Response,
  NextFunction
} from "express";

export function validateResource(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const {
    title,
    author,
    type,
    rating,
    comment
  } = req.body;

  const allowedTypes = [
    "Книга",
    "Курс",
    "Відео",
    "Book",
    "Course",
    "Video"
  ];

  const errors: string[] = [];

  // required

  if (!title) {
    errors.push(
      "Title is required"
    );
  }

  if (!author) {
    errors.push(
      "Author is required"
    );
  }

  if (!type) {
    errors.push(
      "Type is required"
    );
  }
  // length

  if (
    title &&
    title.length < 3
  ) {

    errors.push(
      "Title must be at least 3 characters"
    );
  }

  if (
    comment &&
    comment.length > 200
  ) {

    errors.push(
      "Comment is too long"
    );
  }

  // allowed values

  if (
    type &&
    !allowedTypes.includes(type)
  ) {

    errors.push(
      "Invalid type"
    );
  }

  // range

  if (
  Number(rating) < 1 ||
  Number(rating) > 5
)  {

    errors.push(
      "Rating must be from 1 to 5"
    );
  }

  if (errors.length > 0) {

    return res.status(400).json({

      error: {

        code:
          "VALIDATION_ERROR",

        message:
          "Invalid request body",

        details: errors
      }
    });
  }

  next();
}