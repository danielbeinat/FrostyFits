import connectDB from '../_lib/db.js';
import Subscriber from '../_lib/models/Subscriber.js';
import { handleError, AppError } from '../_lib/errorHandler.js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { action } = req.query;

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        if (action === 'subscribe') {
            await connectDB();
            const { email } = req.body;
            if (!email) throw new AppError('Email is required', 400);

            const existingSubscriber = await Subscriber.findOne({ email });
            if (existingSubscriber) throw new AppError('Ya estás suscrito a nuestro boletín', 409);

            const newSubscriber = new Subscriber({ email });
            await newSubscriber.save();
            return res.status(201).json({ success: true, message: 'Suscripción exitosa' });

        } else if (action === 'contact') {
            const { email, name, message } = req.body;
            if (!email || !name || !message) throw new AppError('Faltan campos por completar', 400);

            const mailOptions = {
                from: `"Contacto desde la web" <${email}>`,
                to: process.env.ADMIN_EMAIL,
                subject: 'Nuevo mensaje de contacto',
                text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ success: true, message: 'Correo enviado correctamente' });

        } else if (action === 'newsletter') {
            await connectDB();
            const { subject, content } = req.body;
            const subscribers = await Subscriber.find();
            const emails = subscribers.map(sub => sub.email);

            for (const email of emails) {
                await transporter.sendMail({
                    from: process.env.EMAIL_USE,
                    to: email,
                    subject,
                    html: content
                });
            }
            return res.status(200).json({ success: true, message: 'Boletín enviado a todos los suscriptores' });

        } else {
            throw new AppError('Invalid action', 400);
        }
    } catch (error) {
        return handleError(res, error);
    }
}
