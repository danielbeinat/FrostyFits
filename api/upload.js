import pkg from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { handleError, AppError } from './_lib/errorHandler.js';

const { v2: cloudinary } = pkg;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecommerce',
        allowed_formats: ['jpg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Usar multer como middleware
        upload.single('product')(req, res, (err) => {
            if (err) {
                return handleError(res, err);
            }

            if (!req.file) {
                throw new AppError('No se subió ningún archivo', 400);
            }

            return res.status(200).json({
                success: 1,
                image_url: req.file.path,
            });
        });
    } catch (error) {
        return handleError(res, error);
    }
}
