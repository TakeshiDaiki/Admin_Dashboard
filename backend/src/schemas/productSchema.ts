import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        price: z.number().nonnegative(),
        description: z.string().min(1, 'Description is required'),
        image: z.string().min(1, 'Image is required'),
        brand: z.string().min(1, 'Brand is required'),
        category: z.string().min(1, 'Category is required'),
        countInStock: z.number().int().nonnegative(),
    }),
});
