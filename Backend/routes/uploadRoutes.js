// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // const API_URL = process.env.API_URL || "http://localhost:3000";
// const API_URL = "https://frostyfi.netlify.app";


// // Configuración de almacenamiento para multer
// const storage = multer.diskStorage({
//     destination: "./upload/images",
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // Ruta para la subida de imágenes
// router.post("/upload", upload.single("product"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ msg: "No file uploaded" });
//     }
//     res.json({
//         success: 1,
//         // image_url: API_URL + "/images/" + req.file.filename,
//         image_url: `${API_URL}/images/${req.file.filename}`,

//     });
// });

// export default router;


// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // const API_URL = process.env.API_URL || "http://localhost:3000";
// const API_URL = "https://frostyfi.netlify.app";

// // Configuración de almacenamiento para multer usando /tmp
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '/tmp'); // Cambiado a /tmp para almacenamiento temporal
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // Ruta para la subida de imágenes
// router.post("/upload", upload.single("product"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ msg: "No file uploaded" });
//     }
//     res.json({
//         success: 1,
//         // Para obtener la URL, puedes almacenar el archivo en otro lugar o usar un servicio externo
//         image_url: `${API_URL}/images/${req.file.filename}`, // Cambia esto según cómo manejes las imágenes
//     });
// });

// export default router;


// import express from "express";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// const router = express.Router();

// // Configuración de Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_URL.split("@")[1],
//     api_key: process.env.CLOUDINARY_URL.split("//")[1].split(":")[0],
//     api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0],
// });

// // Configuración de Multer con almacenamiento en Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "ecommerce", // Carpeta en Cloudinary
//         allowed_formats: ["jpg", "png", "webp"], // Formatos permitidos
//     },
// });

// const upload = multer({ storage });

// // Ruta para subir imágenes
// router.post("/upload", upload.single("product"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ msg: "No se subió ningún archivo" });
//     }

//     res.json({
//         success: 1,
//         image_url: req.file.path, // URL de la imagen subida a Cloudinary
//     });
// });

// export default router;


import express from "express";
import pkg from "cloudinary"; // Importación de Cloudinary como un paquete
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const { v2: cloudinary } = pkg; // Desestructuración para obtener v2 de cloudinary
const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_URL.split("@")[1],
    api_key: process.env.CLOUDINARY_URL.split("//")[1].split(":")[0],
    api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0],
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
