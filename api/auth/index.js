import connectDB from '../_lib/db.js';
import User from '../_lib/models/User.js';
import { handleError, AppError } from '../_lib/errorHandler.js';
import { validateData, schemas } from '../_lib/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { action } = req.query;

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();
        const secretKey = process.env.JWT_SECRET || 'secret_ecom';

        if (action === 'login') {
            const { errors, value } = validateData(schemas.login, req.body);
            if (errors) return res.status(400).json({ success: false, message: 'Validation failed', errors });

            const { email, password } = value;
            const user = await User.findOne({ email });
            if (!user) throw new AppError('Invalid credentials', 401);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AppError('Invalid credentials', 401);

            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });

        } else if (action === 'signup') {
            const { errors, value } = validateData(schemas.user, req.body);
            if (errors) return res.status(400).json({ success: false, message: 'Validation failed', errors });

            const { name, email, password } = value;
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new AppError('User already exists', 400);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({ name, email, password: hashedPassword, cartData: {} });
            await user.save();

            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            return res.status(201).json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } else {
            throw new AppError('Invalid action', 400);
        }
    } catch (error) {
        return handleError(res, error);
    }
}
