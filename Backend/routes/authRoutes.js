import express from "express";
import { signup, login } from "../controllers/authController.js";
import { validate, schemas } from "../utils/validation.js";

const router = express.Router();

router.post("/signup", validate(schemas.user), signup);
router.post("/login", validate(schemas.login), login);

export default router;
