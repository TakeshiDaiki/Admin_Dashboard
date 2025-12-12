import request from 'supertest';
import app from '../app';
import Order from '../models/Order';

jest.mock('../middlewares/authMiddleware', () => ({
    protect: (req: any, res: any, next: any) => {
        req.user = { _id: 'userid', role: 'user' };
        next();
    },
    admin: (req: any, res: any, next: any) => next(),
}));

describe('Order Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create order', async () => {
        jest.spyOn(Order.prototype, 'save').mockResolvedValue({
            totalPrice: 100,
            _id: 'orderid'
        } as any);

        const res = await request(app).post('/api/orders').send({
            orderItems: [{ name: 'P1', qty: 1, image: 'i', price: 100, product: 'pid' }],
            totalPrice: 100
        });

        expect(res.statusCode).toBe(201);
    });
});
