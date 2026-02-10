import cors from 'cors';

// Configuración segura de CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Log para debugging (solo en desarrollo)
        if (process.env.NODE_ENV !== 'production') {
            console.log('CORS request from origin:', origin);
        }

        const envOrigins = (process.env.ALLOWED_ORIGINS || '')
            .split(',')
            .map(o => o.trim())
            .filter(Boolean);

        const allowedOrigins = [
            // Desarrollo
            'http://localhost:3000',
            'http://localhost:5173', // Frontend local
            'http://localhost:5174', // Admin local
            'http://localhost:5175',
            'http://localhost:5176',
            'http://localhost:5177',
            'http://localhost:7654',
            // Producción específica
            'https://frostyfits.netlify.app',
            'https://www.frostyfits.netlify.app',
            // Producción (Vercel y otros)
            ...envOrigins
        ];

        const isVercelOrigin = (o) => {
            try {
                const url = new URL(o);
                return url.hostname.endsWith('.vercel.app');
            } catch {
                return false;
            }
        };

        const isNetlifyOrigin = (o) => {
            try {
                const url = new URL(o);
                return url.hostname.endsWith('.netlify.app');
            } catch {
                return false;
            }
        };

        // Permitir peticiones sin Origin (directas, herramientas, Postman, etc.)
        if (!origin) {
            return callback(null, true);
        }

        // Verificar si el origen está permitido
        const isAllowed = allowedOrigins.includes(origin) || 
                         isVercelOrigin(origin) || 
                         isNetlifyOrigin(origin);

        if (isAllowed) {
            return callback(null, true);
        }

        // En desarrollo, permitir cualquier origen
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }

        // En producción, rechazar orígenes no permitidos
        console.error('CORS blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'auth-token',
        'x-csrf-token',
        'Accept',
        'Origin',
        'Cache-Control',
        'Pragma'
    ],
    exposedHeaders: ['X-Total-Count', 'Authorization'],
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

export default cors(corsOptions);
