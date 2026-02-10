import connectDB from '../_lib/db.js';
import Subscriber from '../_lib/models/Subscriber.js';
import { handleError, AppError } from '../_lib/errorHandler.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const { email } = req.body;

        if (!email) {
            throw new AppError('Email is required', 400);
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            throw new AppError('Ya estás suscrito a nuestro boletín', 409);
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        return res.status(201).json({
            success: true,
            message: 'Suscripción exitosa'
        });
    } catch (error) {
        return handleError(res, error);
    }
}
