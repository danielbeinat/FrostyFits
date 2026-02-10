import jwt from 'jsonwebtoken';
import User from './models/User.js';

export default async function authMiddleware(req, res) {
    const token = req.headers['auth-token'];

    if (!token) {
        return { error: 'Access Denied', status: 401 };
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'secret_ecom';
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return { error: 'User not found', status: 404 };
        }

        return { user };
    } catch (err) {
        return { error: 'Invalid Token', status: 401 };
    }
}
