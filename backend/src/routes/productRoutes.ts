import express from 'express';
import { getProducts, createProduct, deleteProduct } from '../controllers/productController';
import { protect, admin } from '../middlewares/authMiddleware';
import validateResource from '../middlewares/validateResource';
import { createProductSchema } from '../schemas/productSchema';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */
router.get('/', getProducts);
router.post('/', protect, admin, validateResource(createProductSchema), createProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
