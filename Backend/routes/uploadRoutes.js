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


import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// const API_URL = process.env.API_URL || "http://localhost:3000";
const API_URL = "https://frostyfi.netlify.app";

// Configuración de almacenamiento para multer usando /tmp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Cambiado a /tmp para almacenamiento temporal
    },
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
        // Para obtener la URL, puedes almacenar el archivo en otro lugar o usar un servicio externo
        image_url: `${API_URL}/images/${req.file.filename}`, // Cambia esto según cómo manejes las imágenes
    });
});

export default router;
