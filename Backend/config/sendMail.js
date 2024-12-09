import transporter from "./nodemailer.js";

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USE, // Remitente
            to: to,                        // Receptor
            subject: subject,              // Asunto
            text: text,                    // Texto del correo
            html: html                     // HTML del correo
        });

        console.log("Correo enviado:", info.messageId);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

export default sendEmail;
