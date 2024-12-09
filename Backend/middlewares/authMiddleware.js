import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { secretKey } from "../config/jwtConfig.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ msg: "Access Denied" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid Token" });
    }
};

export default authMiddleware;
