import winston from 'winston';
import path from 'path';

// Configuración de niveles de log
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Configuración de colores para consola
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

// Formato personalizado para logs
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ''
            }${info.userId ? ` [User: ${info.userId}]` : ''
            }${info.ip ? ` [IP: ${info.ip}]` : ''
            }${info.method && info.url ? ` [${info.method} ${info.url}]` : ''
            }`
    ),
);

// Transportes para diferentes entornos
const transports = [
    // Console transport para desarrollo
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }),

    // File transport para errores
    new winston.transports.File({
        filename: path.join('logs', 'error.log'),
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),

    // File transport para todos los logs
    new winston.transports.File({
        filename: path.join('logs', 'combined.log'),
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
];

// Crear el logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    levels,
    format,
    transports,
    exitOnError: false,
});

// En producción, no mostrar logs en consola
if (process.env.NODE_ENV === 'production') {
    logger.remove(logger.transports[0]);
}

// Middleware para logging de peticiones HTTP
export const httpLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            userId: req.user?.id || null,
        };

        if (res.statusCode >= 400) {
            logger.warn('HTTP Request', logData);
        } else {
            logger.http('HTTP Request', logData);
        }
    });

    next();
};

// Funciones helper para logging específico
export const logAuth = (action, userId, details = {}) => {
    logger.info(`Auth: ${action}`, { userId, ...details });
};

export const logProduct = (action, productId, userId, details = {}) => {
    logger.info(`Product: ${action}`, { productId, userId, ...details });
};

export const logError = (error, req = null) => {
    const errorData = {
        message: error.message,
        stack: error.stack,
        ...(req && {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
            userId: req.user?.id || null,
            body: req.body,
        })
    };

    logger.error('Application Error', errorData);
};

export const logSecurity = (event, details = {}) => {
    logger.warn(`Security: ${event}`, details);
};

// Crear directorio de logs si no existe
import fs from 'fs';
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

export default logger;
