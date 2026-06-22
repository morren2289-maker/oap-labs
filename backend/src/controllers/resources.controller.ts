import {
  Request,
  Response,
  NextFunction
} from "express";

import * as resourcesService
from "../services/resources.service";

export async function getAll(
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
  await resourcesService.getAllResources(
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

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
  await resourcesService.getResourceById(
    Number(req.params.id)
  );

    return res.status(200).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export async function patch(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
       await resourcesService.patch(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({

      data: resource
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

    const resource =
     await resourcesService.createResource(
        req.body
      );

    return res.status(201).json({

      data: resource
    });

  } catch (err) {

    next(err);
  }
}

export  async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const resource =
      await resourcesService.updateResource(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({

      data: resource
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

    await resourcesService.deleteResource(
      Number(req.params.id)
    );

    return res.status(204).send();

  } catch (err) {

    next(err);
  }
}
export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const result =
      await resourcesService
        .getAverageRating();
        return res.status(200).json(result);

  } catch (error) {

    next(error);

  }

}
export async function getWithReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data =
      await resourcesService.getResourcesWithReviews();

    return res.status(200).json({
      items: data
    });
  } catch (err) {
    next(err);
  }
}