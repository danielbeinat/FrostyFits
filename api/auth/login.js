import connectDB from '../_lib/db.js';
import User from '../_lib/models/User.js';
import { handleError, AppError } from '../_lib/errorHandler.js';
import { validateData, schemas } from '../_lib/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Validar datos
        const { errors, value } = validateData(schemas.login, req.body);
        if (errors) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        const { email, password } = value;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generar token
        const secretKey = process.env.JWT_SECRET || 'secret_ecom';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return handleError(res, error);
    }
}
