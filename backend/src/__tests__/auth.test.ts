import request from 'supertest';
import app from '../app';
import User from '../models/User';
import generateToken from '../utils/generateToken';

jest.mock('../models/User');
jest.mock('../utils/generateToken');

describe('Auth Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            (User.create as jest.Mock).mockResolvedValue({
                _id: 'userid',
                name: 'Test',
                email: 'test@example.com',
                role: 'user',
            });
            (generateToken as jest.Mock).mockReturnValue({ token: 't', refreshToken: 'r' });

            const res = await request(app).post('/api/auth/register').send({
                name: 'Test',
                email: 'test@example.com',
                password: 'password123'
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.email).toBe('test@example.com');
        });

        it('should fail if user exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ name: 'Existing' });

            const res = await request(app).post('/api/auth/register').send({
                name: 'Test',
                email: 'test@example.com',
                password: 'password123'
            });

            expect(res.statusCode).toBe(400);
        });
    });
});
