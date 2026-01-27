import cors from 'cors';

// Configuración segura de CORS
const corsOptions = {
    origin: function (origin, callback) {
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
            // Producción (Vercel)
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

        // En producción, verificar origen
        if (process.env.NODE_ENV === 'production') {
            // Permitir peticiones sin Origin (directas, herramientas, etc.)
            if (!origin) return callback(null, true);
            if (!allowedOrigins.includes(origin) && !isVercelOrigin(origin) && !isNetlifyOrigin(origin)) {
                return callback(new Error('Not allowed by CORS'));
            }
        }

        // En desarrollo, permitir orígenes conocidos o sin origen (para herramientas)
        if (!origin || allowedOrigins.includes(origin) || isVercelOrigin(origin) || isNetlifyOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
    exposedHeaders: ['X-Total-Count'],
    maxAge: 86400, // 24 hours
};

export default cors(corsOptions);
