export const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'development'
        ? 'http://localhost:5000'
        : 'https://frosty-fits-backend.vercel.app');
