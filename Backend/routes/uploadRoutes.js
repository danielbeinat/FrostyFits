import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para la subida de imágenes
router.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: "http://localhost:3000/images/" + req.file.filename,
    });
});

export default router;
