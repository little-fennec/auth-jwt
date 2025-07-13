import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth';

export function userRoutes(controller: UserController, jwtSecret: string) {
  const router = Router();
  /**
   * @openapi
   * /api/users:
   *   get:
   *     summary: Get user list (protected)
   *     tags:
   *       - Users
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   email:
   *                     type: string
   *       401:
   *         description: Unauthorized
   */
  router.get('/users', authMiddleware(jwtSecret), controller.getAll);
  return router;
} 