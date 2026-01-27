const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'development' ? 'http://localhost:5000' : 'https://impossible-berny-dev321-195cbe0d.koyeb.app');

export { API_URL };
