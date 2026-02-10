import connectDB from '../_lib/db.js';
import Subscriber from '../_lib/models/Subscriber.js';
import { handleError } from '../_lib/errorHandler.js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await connectDB();

        const { subject, content } = req.body;
        const subscribers = await Subscriber.find();
        const emails = subscribers.map(sub => sub.email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        for (const email of emails) {
            await transporter.sendMail({
                from: process.env.EMAIL_USE,
                to: email,
                subject,
                html: content
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Boletín enviado a todos los suscriptores'
        });
    } catch (error) {
        return handleError(res, error);
    }
}
