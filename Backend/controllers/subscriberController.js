import Subscriber from "../models/SubscriberModel.js";
import sendEmail from '../config/sendMail.js';
import nodemailer from "nodemailer";

const subscribe = async (req, res) => {
    const { email } = req.body;
    try {

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).send({ message: 'Ya estás suscrito a nuestro boletín.' });

        }
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        await sendEmail(email, 'Bienvenido', 'Gracias por suscribirte a nuestro boletín.', '<b>Gracias por suscribirte a nuestro boletín.</b>');
        res.status(201).send({ message: 'Suscripción exitosa.' });
    } catch (error) {
        res.status(400).send({ message: 'Error al suscribirse.', error });
    }
};

// Lógica para enviar boletines
const sendNewsletter = async (req, res) => {
    const { subject, content } = req.body;

    try {
        const subscribers = await Subscriber.find();
        const emails = subscribers.map(sub => sub.email);

        // Enviar el boletín a todos los suscriptores
        for (const email of emails) {
            await sendEmail(email, subject, content, content);
        }

        res.status(200).send({ message: 'Boletín enviado a todos los suscriptores.' });
    } catch (error) {
        res.status(500).send({ message: 'Error al enviar el boletín.', error });
    }
};


const sendContactEmail = async (req, res) => {

    const { email, name, message } = req.body

    if (!email || !name || !message) {
        return res.status(400).send({ message: 'Faltan campos por completar' });
    }
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Contacto desde la web" <${email}>`,
            to: process.env.ADMIN_EMAIL, // Correo del administrador
            subject: "Nuevo mensaje de contacto",
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: 'Correo enviado correctamente' });
    }

    catch (error) {
        console.error("Error al enviar el correo:", error); // Agrega esta línea para registrar el error en la consola


        res.status(500).send({ message: 'Error al enviar el correo', error });


    }
}

export { subscribe, sendNewsletter, sendContactEmail };
