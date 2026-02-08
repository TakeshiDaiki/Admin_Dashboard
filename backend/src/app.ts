import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

/* =======================
   MIDDLEWARES BÁSICOS
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));

/* =======================
   CORS — PRODUCCIÓN REAL
======================= */
app.use(
    cors({
        origin: process.env.CLIENT_URL, // ← viene desde Render
        credentials: true,
    })
);

/* =======================
   SWAGGER CONFIG
======================= */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Admin Dashboard API',
            version: '1.0.0',
            description: 'API Documentation for Admin Dashboard',
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

/* =======================
   ROUTES
======================= */
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

/* =======================
   HEALTH + ROOT
======================= */
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

app.get('/', (_req, res) => {
    res.send('Admin Dashboard API is running');
});

/* =======================
   ERROR HANDLERS
======================= */
import { notFound, errorHandler } from './middlewares/errorMiddleware';

app.use(notFound);
app.use(errorHandler);

export default app;
