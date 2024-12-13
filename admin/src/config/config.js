export const API_URL = import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://frosty-fits-backend.vercel.app';
