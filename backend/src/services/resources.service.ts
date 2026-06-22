import * as resourcesRepository
from "../repositories/resources.repository";

import {
  UpdateResourceRequestDto
}
from "../dtos/update-resource-request.dto";

import {
  CreateResourceRequestDto
}
from "../dtos/create-resource-request.dto";

export async function getAllResources(
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortDir?: string
) {

  return await resourcesRepository.getAll(
    page,
    pageSize,
    sortBy,
    sortDir
  );
} 
export async function patch(
  id: number,
  dto: UpdateResourceRequestDto
) {

  const patched = await resourcesRepository.patch(id, dto);

  if (!patched) {
    throw {
      status: 404,
      code: "NOT_FOUND",
      message: "Resource not found"
    };
  }

  return patched;
}

export  async function getResourceById(
  id: number
) {

  const resource =
     await resourcesRepository.getById(id);

  if (!resource) {

    throw {

      status: 404,

      code: "NOT_FOUND",

      message:
        "Resource not found"
    };
  }

  return resource;
}

export async function createResource(
  dto: CreateResourceRequestDto
) {

  if (
    !dto.title ||
    !dto.author
  ) {

    throw {

      status: 400,

      code:
        "VALIDATION_ERROR",

      message:
        "Title and author are required"
    };
  }

  if (
    dto.rating === undefined ||
    dto.rating < 1 ||
    dto.rating > 5
  ) {

    throw {

      status: 400,

      code:
        "VALIDATION_ERROR",

      message:
        "Rating must be from 1 to 5"
    };
  }

  return await resourcesRepository.create(dto);
}
export async function getAverageRating() {

  return await resourcesRepository
    .getAverageRating();

}

export async function updateResource(
  id: number,
  dto: UpdateResourceRequestDto
) {

  const updated =
    await resourcesRepository.update(
      id,
      dto
    );

  if (!updated) {

    throw {

      status: 404,

      code: "NOT_FOUND",

      message:
        "Resource not found"
    };
  }

  return updated;
}

export async function deleteResource(
  id: number
) {

  const deleted =
    await resourcesRepository.remove(id);

  if (!deleted) {

    throw {

      status: 404,

      code: "NOT_FOUND",

      message:
        "Resource not found"
    };
  }
}
export async function getResourcesWithReviews() {
  return await resourcesRepository
    .getResourcesWithReviews();
}