import { Router }
from "express";

import {
  validateResource
}
from "../middleware/validate-resource.middleware";

import * as resourcesController
from "../controllers/resources.controller";

const router = Router();

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources
 *     responses:
 *       200:
 *         description: Resources list
 */
router.get(
  "/",
  resourcesController.getAll
);

/**
 * @swagger
 * /api/resources/with-reviews:
 *   get:
 *     summary: Get resources with reviews
 *     responses:
 *       200:
 *         description: Resources with reviews
 */
router.get(
  "/with-reviews",
  resourcesController.getWithReviews
);

/**
 * @swagger
 * /api/resources/stats:
 *   get:
 *     summary: Get resources statistics
 *     responses:
 *       200:
 *         description: Resources statistics
 */
router.get(
  "/stats",
  resourcesController.getStats
);

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Get resource by id
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 */
router.get(
  "/:id",
  resourcesController.getById
);

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Create resource
 *     responses:
 *       201:
 *         description: Resource created
 */
router.post(
  "/",
  validateResource,
  resourcesController.create
);

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Update resource
 *     responses:
 *       200:
 *         description: Resource updated
 *       404:
 *         description: Resource not found
 */
router.put(
  "/:id",
  validateResource,
  resourcesController.update
);

/**
 * @swagger
 * /api/resources/{id}:
 *   patch:
 *     summary: Patch resource
 *     responses:
 *       200:
 *         description: Resource patched
 *       404:
 *         description: Resource not found
 */
router.patch(
  "/:id",
  resourcesController.patch
);

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete resource
 *     responses:
 *       204:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 */
router.delete(
  "/:id",
  resourcesController.remove
);

export default router;