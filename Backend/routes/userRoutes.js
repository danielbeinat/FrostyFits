import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/addtocart", authMiddleware, addToCart);
router.post("/removefromcart", authMiddleware, removeFromCart);
router.get("/getCart", authMiddleware, getCart);


export default router;
