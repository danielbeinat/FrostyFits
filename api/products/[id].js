import connectDB from '../../_lib/db.js';
import Product from '../../_lib/models/Product.js';
import { handleError, AppError } from '../../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const { id } = req.query;

        if (!id) {
            throw new AppError('Product ID is required', 400);
        }

        const product = await Product.findById(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        return handleError(res, error);
    }
}
