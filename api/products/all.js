import connectDB from '../_lib/db.js';
import Product from '../_lib/models/Product.js';
import { handleError, AppError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    const { action } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        if (action === 'allproducts') {
            const products = await Product.find({}).sort({ date: -1 });
            return res.status(200).json({ success: true, products });

        } else if (action === 'newcollection') {
            const products = await Product.find({}).sort({ date: -1 }).limit(8);
            return res.status(200).json({ success: true, products });

        } else if (action === 'trending') {
            const products = await Product.find({}).sort({ views: -1 }).limit(4);
            return res.status(200).json({ success: true, products });

        } else if (action === 'search') {
            const { query } = req.query;
            if (!query) throw new AppError('Search query is required', 400);
            const products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } }
                ]
            });
            return res.status(200).json({ success: true, products });

        } else {
            throw new AppError('Invalid action', 400);
        }
    } catch (error) {
        return handleError(res, error);
    }
}
