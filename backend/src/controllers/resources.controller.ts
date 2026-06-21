import {
  Request,
  Response,
  NextFunction
} from "express";

import * as resourcesService
from "../services/resources.service";

export function getAll(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const page =
  Number(req.query.page);

const pageSize =
  Number(req.query.pageSize);


const sortBy =
  String(req.query.sortBy || "");

const sortDir =
  String(req.query.sortDir || "asc");

const resources =
  resourcesService.getAllResources(
    page,
    pageSize,
    sortBy,
    sortDir
  );

    return res.status(200).json({

  items: resources,

  total:
    resources.length
});

  } catch (err) {

    next(err);
  }
}

export function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
      resourcesService.getResourceById(
        String(req.params.id)
      );

    return res.status(200).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export function patch(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
      resourcesService.patch(
        String(req.params.id),
        req.body
      );

    return res.status(200).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export function create(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
      resourcesService.createResource(
        req.body
      );

    return res.status(201).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export function update(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
      resourcesService.updateResource(
        String(req.params.id),
        req.body
      );

    return res.status(200).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export function remove(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    resourcesService.deleteResource(
      String(req.params.id)
    );

    return res.status(204).send();

  } catch (err) {

    next(err);
  }
}