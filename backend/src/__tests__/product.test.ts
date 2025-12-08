import request from 'supertest';
import app from '../app';
import Product from '../models/Product';
import * as AuthMiddleware from '../middlewares/authMiddleware';

jest.mock('../models/Product');
jest.mock('../middlewares/authMiddleware', () => ({
    protect: (req: any, res: any, next: any) => {
        req.user = { _id: 'adminid', role: 'admin' };
        next();
    },
    admin: (req: any, res: any, next: any) => next(),
}));

describe('Product Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all products', async () => {
        (Product.find as jest.Mock).mockResolvedValue([{ name: 'P1' }]);

        const res = await request(app).get('/api/products');

        expect(res.statusCode).toBe(200);
        expect(res.body[0].name).toBe('P1');
    });

    it('should create product', async () => {
        (Product.prototype.save as jest.Mock).mockResolvedValue({
            name: 'New Product',
            price: 100
        });

        const res = await request(app).post('/api/products').send({
            name: 'New Product',
            price: 100,
            image: 'img.jpg',
            brand: 'B',
            category: 'C',
            description: 'D',
            countInStock: 10
        });

        expect(res.statusCode).toBe(201);
    });
});
