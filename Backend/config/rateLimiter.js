import rateLimit from 'express-rate-limit';

// Configuración de rate limiting
const createRateLimiter = (options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutos por defecto
        max: options.max || 100, // Máximo de peticiones por ventana
        message: {
            success: false,
            message: 'Too many requests, please try again later.',
            retryAfter: Math.ceil((options.windowMs || 15 * 60 * 1000) / 1000)
        },
        standardHeaders: true, // Incluir rate limit headers
        legacyHeaders: false, // Desactivar headers legacy
        skip: (req) => {
            // Omitir rate limiting para rutas de salud y archivos estáticos
            return req.path === '/health' || req.path.startsWith('/images');
        },
        skipSuccessfulRequests: false,
        skipFailedRequests: false,
        // Omitir validación de X-Forwarded-For para Koyeb
        validate: { xForwardedForHeader: false },
        ...options
    });
};

// Rate limiters específicos para diferentes endpoints
export const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 intentos de login
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes.',
        retryAfter: 900
    }
});

export const uploadLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: process.env.NODE_ENV === 'production' ? 50 : 200, // 50 uploads por hora en producción, 200 en desarrollo
    message: {
        success: false,
        message: 'Upload limit reached, please try again later.',
        retryAfter: 3600
    }
});

export const generalLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // 1000 peticiones por ventana
    message: {
        success: false,
        message: 'Rate limit exceeded, please slow down.',
        retryAfter: 900
    }
});

export default generalLimiter;
