import express from 'express';
import { addOrderItems, getOrders, updateOrderStatus } from '../controllers/orderController';
import { protect, admin } from '../middlewares/authMiddleware';
import validateResource from '../middlewares/validateResource';
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/orderSchema';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.post('/', protect, validateResource(createOrderSchema), addOrderItems);
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, validateResource(updateOrderStatusSchema), updateOrderStatus);

export default router;
