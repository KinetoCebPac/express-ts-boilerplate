import { Router } from 'express';

export const healthRouter = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the health status of the API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
healthRouter.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
