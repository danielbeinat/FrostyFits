export const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'development'
        ? 'http://localhost:3000'
        : 'https://frostyfits.vercel.app'); // Actualizar con tu URL de Vercel después del deploy

