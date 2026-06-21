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

export function getAllResources(
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortDir?: string
) {

  return resourcesRepository.getAll(
    page,
    pageSize,
    sortBy,
    sortDir
  );
} 
export function patch(
  id: string,
  dto: UpdateResourceRequestDto
) {

  return resourcesRepository.patch(
    id,
    dto
  );
}

export function getResourceById(
  id: string
) {

  const resource =
    resourcesRepository.getById(id);

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

export function createResource(
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

  return resourcesRepository.create(dto);
}

export function updateResource(
  id: string,
  dto: UpdateResourceRequestDto
) {

  const updated =
    resourcesRepository.update(
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

export function deleteResource(
  id: string
) {

  const deleted =
    resourcesRepository.remove(id);

  if (!deleted) {

    throw {

      status: 404,

      code: "NOT_FOUND",

      message:
        "Resource not found"
    };
  }
}