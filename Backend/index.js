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

// Middleware
// app.use(cors());
app.use(cors({
    origin: 'https://frostyfits.onrender.com', // Cambia esto por tu dominio de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica los métodos permitidos
}));

app.use(express.json());
app.use("/images", express.static("upload/images"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", uploadRoutes);
app.use('/api/subscribers', subscriberRoutes);


// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

