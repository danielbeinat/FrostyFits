import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { catchAsync, AppError } from "../middlewares/errorHandler.js";
import { logAuth, logSecurity } from "../config/logger.js";
import User from "../models/User.js";
import { secretKey, expiresIn } from "../config/jwtConfig.js";

export const signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        logSecurity('Signup attempt with existing email', { email, ip: req.ip });
        return next(new AppError('Email already exists', 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const cartData = {};
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        cartData,
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn });

    // Log successful signup
    logAuth('User signed up', newUser._id, { email, ip: req.ip });

    res.status(201).json({
        success: true,
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        logSecurity('Login attempt with invalid email', { email, ip: req.ip });
        return next(new AppError('Invalid email or password', 400));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        logSecurity('Login attempt with invalid password', { email, ip: req.ip });
        return next(new AppError('Invalid email or password', 400));
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });

    // Remove password from output
    user.password = undefined;

    // Log successful login
    logAuth('User logged in', user._id, { email, ip: req.ip });

    res.json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});
