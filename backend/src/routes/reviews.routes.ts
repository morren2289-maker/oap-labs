import { Router } from "express";

import * as reviewsController
from "../controllers/reviews.controller";

const router = Router();

router.get(
  "/",
  reviewsController.getAll
);

router.get(
  "/:id",
  reviewsController.getById
);

router.post(
  "/",
  reviewsController.create
);

router.patch(
  "/:id",
  reviewsController.update
);

router.delete(
  "/:id",
  reviewsController.remove
);

export default router;