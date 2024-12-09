import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { secretKey, expiresIn } from "../config/jwtConfig.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const cartData = {};
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            cartData,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
