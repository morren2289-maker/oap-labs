import {
  Request,
  Response,
  NextFunction
} from "express";

import * as reviewsService
from "../services/reviews.service";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const resourceId = req.query.resourceId
      ? Number(req.query.resourceId)
      : undefined;

    const reviews =
      await reviewsService.getAllReviews(resourceId);

    return res.status(200).json({
      items: reviews
    });
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const review =
      await reviewsService.getReviewById(
        Number(req.params.id)
      );

    return res.status(200).json({
      data: review
    });
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const review =
      await reviewsService.createReview(
        req.body
      );

    return res.status(201).json({
      data: review
    });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const review =
      await reviewsService.updateReview(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({
      data: review
    });
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await reviewsService.deleteReview(
      Number(req.params.id)
    );

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}