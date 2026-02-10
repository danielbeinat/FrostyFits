import connectDB from '../_lib/db.js';
import User from '../_lib/models/User.js';
import authMiddleware from '../_lib/authMiddleware.js';
import { handleError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Verificar autenticación
        const auth = await authMiddleware(req, res);
        if (auth.error) {
            return res.status(auth.status).json({ success: false, message: auth.error });
        }

        const { itemId, quantity = 1 } = req.body;
        const userData = await User.findById(auth.user._id);

        userData.cartData[itemId] = Math.max(0, (userData.cartData[itemId] || 0) - quantity);

        if (userData.cartData[itemId] === 0) {
            delete userData.cartData[itemId];
        }

        await User.findByIdAndUpdate(auth.user._id, {
            cartData: userData.cartData
        });

        return res.status(200).json({
            success: true,
            message: 'Removed from cart',
            cart: userData.cartData
        });
    } catch (error) {
        return handleError(res, error);
    }
}
