import * as reviewsRepository
from "../repositories/reviews.repository";

import {
  CreateReviewRequestDto
} from "../dtos/create-review-request.dto";

import {
  UpdateReviewRequestDto
} from "../dtos/update-review-request.dto";

export async function getAllReviews(
  resourceId?: number
) {
  return await reviewsRepository.getAll(resourceId);
}

export async function getReviewById(
  id: number
) {
  const review = await reviewsRepository.getById(id);

  if (!review) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "Review not found"
    };
  }

  return review;
}

export async function createReview(
  dto: CreateReviewRequestDto
) {
  if (
    !dto.resourceId ||
    !dto.userId ||
    !dto.text
  ) {
    throw {
      status: 400,
      code: "VALIDATION_ERROR",
      message: "resourceId, userId and text are required"
    };
  }

  if (
    dto.rating < 1 ||
    dto.rating > 5
  ) {
    throw {
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Rating must be from 1 to 5"
    };
  }

  return await reviewsRepository.create(dto);
}

export async function updateReview(
  id: number,
  dto: UpdateReviewRequestDto
) {
  const updated = await reviewsRepository.update(id, dto);

  if (!updated) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "Review not found"
    };
  }

  return updated;
}

export async function deleteReview(
  id: number
) {
  const deleted = await reviewsRepository.remove(id);

  if (!deleted) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "Review not found"
    };
  }
}