import connectDB from '../_lib/db.js';
import Product from '../_lib/models/Product.js';
import { handleError, AppError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const { query } = req.query;

        if (!query) {
            throw new AppError('Search query is required', 400);
        }

        const products = await Product.find({
            $and: [
                { aviable: true },
                {
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { category: { $regex: query, $options: 'i' } },
                        { type: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }).sort({ date: -1 });

        return res.status(200).json({ success: true, products });
    } catch (error) {
        return handleError(res, error);
    }
}
