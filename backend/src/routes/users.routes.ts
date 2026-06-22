import { Router } from "express";

import {
  validateUser
} from "../middleware/validate-user.middleware";

import * as usersController
from "../controllers/users.controller";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Users list
 */
router.get(
  "/",
  usersController.getAll
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  usersController.getById
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  "/",
  validateUser,
  usersController.create
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  validateUser,
  usersController.update
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  usersController.remove
);

export default router;