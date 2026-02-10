import mongoose from 'mongoose';

// Cache de conexión para reutilizar entre invocaciones serverless
let cachedConnection = null;

export default async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        cachedConnection = connection;
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
