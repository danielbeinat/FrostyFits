import { handleError, AppError } from '../_lib/errorHandler.js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { email, name, message } = req.body;

        if (!email || !name || !message) {
            throw new AppError('Faltan campos por completar', 400);
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Contacto desde la web" <${email}>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Correo enviado correctamente'
        });
    } catch (error) {
        return handleError(res, error);
    }
}
