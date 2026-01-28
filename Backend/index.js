import express from "express";
import helmet from "helmet";
import cors from "./config/cors.js";
import db from "./config/db.js";
import dotenv from "dotenv";
import logger, { httpLogger } from "./config/logger.js";
import generalLimiter, { authLimiter, uploadLimiter } from "./config/rateLimiter.js";
import { sanitizeInput } from "./utils/validation.js";
import { notFound } from "./middlewares/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import User from "./models/User.js";

const app = express();
dotenv.config();

db();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

app.use(cors);
app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use(httpLogger);
app.use("/images", express.static("upload/images"));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});
app.get('/health/db', async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        res.status(200).json({
            status: 'OK',
            db: {
                state,
                name: mongoose.connection.name,
                host: mongoose.connection.host
            },
            collections: {
                products: productCount,
                users: userCount
            },
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: err.message
        });
    }
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", uploadLimiter, uploadRoutes);
app.use('/api/subscribers', subscriberRoutes);

if (process.env.NODE_ENV === 'development') {
    app.get('/api', (req, res) => {
        res.json({
            message: 'FrostyFits API',
            version: '1.0.0',
            endpoints: {
                auth: '/api/auth',
                products: '/api/products',
                users: '/api/users',
                upload: '/api/upload',
                subscribers: '/api/subscribers'
            },
            documentation: 'https://github.com/your-repo/docs'
        });
    });
}

app.use(notFound);
app.use(errorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default server;

