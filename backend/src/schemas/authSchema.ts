import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password is too short - should be 6 chars minimum'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password is too short'),
    }),
});
