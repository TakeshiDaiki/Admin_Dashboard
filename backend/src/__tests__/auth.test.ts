import request from 'supertest';
import app from '../app';
import User from '../models/User';
import * as genToken from '../utils/generateToken';

describe('Auth Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null as any);
            jest.spyOn(User, 'create').mockResolvedValue({
                _id: 'userid',
                name: 'Test',
                email: 'test@example.com',
                role: 'user',
            } as any);
            jest.spyOn(genToken as any, 'default').mockReturnValue({ token: 't', refreshToken: 'r' } as any);

            const res = await request(app).post('/api/auth/register').send({
                name: 'Test',
                email: 'test@example.com',
                password: 'password123'
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.email).toBe('test@example.com');
        });

        it('should fail if user exists', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({ name: 'Existing' } as any);

            const res = await request(app).post('/api/auth/register').send({
                name: 'Test',
                email: 'test@example.com',
                password: 'password123'
            });

            expect(res.statusCode).toBe(400);
        });
    });
});
