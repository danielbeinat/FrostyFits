import express from "express";
import pkg from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const { v2: cloudinary } = pkg;
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommerce",
        allowed_formats: ["jpg", "png", "webp"],
    },
});

const upload = multer({ storage });

router.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No se subió ningún archivo" });
    }

    res.json({
        success: 1,
        image_url: req.file.path,
    });
});

export default router;
