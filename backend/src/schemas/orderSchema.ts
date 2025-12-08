import { z } from 'zod';

const orderItemSchema = z.object({
    name: z.string(),
    qty: z.number(),
    image: z.string(),
    price: z.number(),
    product: z.string(),
});

export const createOrderSchema = z.object({
    body: z.object({
        orderItems: z.array(orderItemSchema).nonempty('Order items cannot be empty'),
        totalPrice: z.number(),
    }),
});

export const updateOrderStatusSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
    }),
});
