import {
    validateCreateReview
} from "../middleware/validate-create-review.middleware";

import {
    validateUpdateReview
} from "../middleware/validate-update-review.middleware";
import { Router } from "express";
import {
    validateReview
} from "../middleware/validate-review.middleware";
import * as reviewsController
from "../controllers/reviews.controller";
import { demoAuth } from "../middleware/demo-auth.middleware";

const router = Router();

router.get(
  "/",
  reviewsController.getAll
);

router.get(
  "/:id",
  demoAuth,
  reviewsController.getById
);

router.post(
  "/",
  validateCreateReview,
  reviewsController.create
);

router.patch(
  "/:id",
  demoAuth,
  validateUpdateReview,
  reviewsController.update
);

router.delete(
  "/:id",
  demoAuth,
  reviewsController.remove
);

export default router;