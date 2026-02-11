import connectDB from '../_lib/db.js';
import User from '../_lib/models/User.js';
import authMiddleware from '../_lib/authMiddleware.js';
import { handleError, AppError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    await connectDB();

    // Recheck method based on action if needed, but these are mixed GET/POST
    const { action } = req.query;

    try {
        // Verificar autenticación
        const auth = await authMiddleware(req, res);
        if (auth.error) {
            return res.status(auth.status).json({ success: false, message: auth.error });
        }

        const user = await User.findById(auth.user._id);
        if (!user) throw new AppError('User not found', 404);

        if (action === 'get') {
            if (req.method !== 'GET') throw new AppError('Method not allowed', 405);
            return res.status(200).json(user.cartData);

        } else if (action === 'add') {
            if (req.method !== 'POST') throw new AppError('Method not allowed', 405);
            const { itemId, quantity = 1 } = req.body;
            user.cartData[itemId] = (user.cartData[itemId] || 0) + quantity;
            await User.findByIdAndUpdate(auth.user._id, { cartData: user.cartData });
            return res.status(200).json({ success: true, message: 'Added to cart', cart: user.cartData });

        } else if (action === 'remove') {
            if (req.method !== 'POST') throw new AppError('Method not allowed', 405);
            const { itemId, quantity = 1 } = req.body;
            user.cartData[itemId] = Math.max(0, (user.cartData[itemId] || 0) - quantity);
            if (user.cartData[itemId] === 0) delete user.cartData[itemId];
            await User.findByIdAndUpdate(auth.user._id, { cartData: user.cartData });
            return res.status(200).json({ success: true, message: 'Removed from cart', cart: user.cartData });

        } else {
            throw new AppError('Invalid action', 400);
        }
    } catch (error) {
        return handleError(res, error);
    }
}
