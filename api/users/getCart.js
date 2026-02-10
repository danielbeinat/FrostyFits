import connectDB from '../_lib/db.js';
import User from '../_lib/models/User.js';
import authMiddleware from '../_lib/authMiddleware.js';
import { handleError, AppError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Verificar autenticación
        const auth = await authMiddleware(req, res);
        if (auth.error) {
            return res.status(auth.status).json({ success: false, message: auth.error });
        }

        const user = await User.findById(auth.user._id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        return res.status(200).json(user.cartData);
    } catch (error) {
        return handleError(res, error);
    }
}
