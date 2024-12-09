import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Servidor SMTP para Gmail
    port: 587, // Puerto SMTP para conexión segura (STARTTLS)
    secure: false, // Usa `false` para el puerto 587
    auth: {
        user: process.env.EMAIL_USER, // Tu correo de Gmail (ejemplo@gmail.com)
        pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación de Gmail
    },
});

export default transporter;
