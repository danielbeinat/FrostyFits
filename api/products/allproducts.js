import connectDB from '../_lib/db.js';
import Product from '../_lib/models/Product.js';
import { handleError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();
        const products = await Product.find({}).sort({ date: -1 });
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return handleError(res, error);
    }
}
