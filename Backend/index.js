// import express from "express";
// import cors from "cors";
// import db from "./config/db.js";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import subscriberRoutes from "./routes/subscriberRoutes.js";
// import errorHandler from "./middlewares/errorHandler.js";


// const app = express();
// dotenv.config();
// db();

// // Middleware
// // app.use(cors());



// const allowedOrigins = [
//     'https://frostyfi.netlify.app',
//     'https://frostyfits-admin.netlify.app'
//     // 'https://frostyfits-admin.onrender.com',
// ];

// // Configuración de CORS
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('No permitido por CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

// app.use(express.json());
// app.use("/images", express.static("upload/images"));


// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api", uploadRoutes);
// app.use('/api/subscribers', subscriberRoutes);


// // Middleware de errores
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();
db();

// Middleware de CORS
const allowedOrigins = [
    'https://frostyfi.netlify.app',
    'https://frostyfits-admin.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        console.log('Origin:', origin); // Log para ver el origen
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use("/images", express.static("upload/images"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", uploadRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
