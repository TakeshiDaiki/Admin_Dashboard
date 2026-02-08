import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

/* =========================
   CORS CONFIG (PRO)
========================= */

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://admin-dashboard-virid-mu-14.vercel.app',
];

app.use(cors({
    origin: (origin, callback) => {
        // Permitir requests sin origin (Postman, curl, healthchecks)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
}));

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));

/* =========================
   SWAGGER
========================= */

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Admin Dashboard API',
            version: '1.0.0',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3001',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/* =========================
   ROUTES
========================= */

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.get('/', (_req, res) => {
    res.send('API is running');
});

/* =========================
   ERRORS
========================= */

import { notFound, errorHandler } from './middlewares/errorMiddleware';

app.use(notFound);
app.use(errorHandler);

export default app;
