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
 * /api/resources/{id}:
 *   get:
 *     summary: Get resource by id
 *     responses:
 *       200:
 *         description: Resource found
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
 */
router.put(
  "/:id",
  validateResource,
  resourcesController.update
);
/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete resource
 *     responses:
 *       204:
 *         description: Resource deleted
 */
router.delete(
  "/:id",
  resourcesController.remove

);

 router.patch(
  "/:id",
  resourcesController.patch
);

export default router;