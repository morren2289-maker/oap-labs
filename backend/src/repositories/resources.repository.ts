import { randomUUID }
from "crypto";

import {
  ResourceResponseDto
}
from "../dtos/resource-response.dto";

import {
  CreateResourceRequestDto
}
from "../dtos/create-resource-request.dto";

import {
  UpdateResourceRequestDto
}
from "../dtos/update-resource-request.dto";

const resources: ResourceResponseDto[] = [];

export function getAll(
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortDir?: string
) {

  const result = [...resources];

  if (sortBy) {

    result.sort((a, b) => {

      const aValue =
        a[
          sortBy as keyof ResourceResponseDto
        ];

      const bValue =
        b[
          sortBy as keyof ResourceResponseDto
        ];

      if (aValue < bValue) {
        return sortDir === "desc"
          ? 1
          : -1;
      }

      if (aValue > bValue) {
        return sortDir === "desc"
          ? -1
          : 1;
      }

      return 0;
    });
  }

  if (
    !page ||
    !pageSize
  ) {

    return result;
  }

  const start =
    (page - 1) * pageSize;

  const end =
    start + pageSize;

  return result.slice(
    start,
    end
  );
} 

export function patch(
  id: string,
  dto: UpdateResourceRequestDto
) {

  const resource =
    resources.find(
      resource =>
        resource.id === id
    );

  if (!resource) {

    throw {
      status: 404,
      message:
        "Resource not found"
    };
  }

  Object.assign(
    resource,
    dto
  );

  return resource;
}

export function getById(
  id: string
) {

  return resources.find(
    resource =>
      resource.id === id
  );
}

export function create(
  dto: CreateResourceRequestDto
) {

  const resource = {

    id: randomUUID(),

    title: dto.title,

    author: dto.author,

    type: dto.type,

    rating: dto.rating,

    comment: dto.comment
  };

  resources.push(resource);

  return resource;
}

export function update(
  id: string,
  dto: UpdateResourceRequestDto
) {

  const resource =
    resources.find(
      resource =>
        resource.id === id
    );

  if (!resource) {
    return null;
  }

  resource.title =
    dto.title;

  resource.author =
    dto.author;

  resource.type =
    dto.type;

  resource.rating =
    dto.rating;

  resource.comment =
    dto.comment;

  return resource;
}

export function remove(
  id: string
) {

  const index =
    resources.findIndex(
      resource =>
        resource.id === id
    );

  if (index === -1) {
    return false;
  }

  resources.splice(index, 1);

  return true;
}