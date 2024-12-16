import express from "express";
import pkg from "cloudinary"; // Importación de Cloudinary como un paquete
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const { v2: cloudinary } = pkg; // Desestructuración para obtener v2 de cloudinary
const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Configuración de Multer con almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommerce", // Carpeta en Cloudinary
        allowed_formats: ["jpg", "png", "webp"], // Formatos permitidos
    },
});

const upload = multer({ storage });

// Ruta para subir imágenes
router.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No se subió ningún archivo" });
    }

    res.json({
        success: 1,
        image_url: req.file.path, // URL de la imagen subida a Cloudinary
    });
});

export default router;
