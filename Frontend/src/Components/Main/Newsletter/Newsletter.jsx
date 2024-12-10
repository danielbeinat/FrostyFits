import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { API_URL } from "../../../config/config.js";

import "./Newsletter.scss";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setResponseMessage("Por favor, ingresá un email válido.");
      setResponseType("error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/subscribers/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message || "¡Suscripción exitosa!");
        setResponseType("success");

        setEmail("");
        //limpiar el mensaje después de unos segundos
        setTimeout(() => setResponseMessage(""), 5000);
      } else if (response.status === 409) {
        setResponseMessage("Este email ya está suscripto.");
        setTimeout(() => setResponseMessage(""), 5000);

        setResponseType("error");
      } else {
        setResponseMessage(data.message || "Hubo un problema al suscribirte.");
        setResponseType("error");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setResponseMessage("Error al suscribirte. Por favor, intentá de nuevo.");
      setResponseType("error");
    }
  };

  return (
    <div className="newsletter font-parkinsans">
      <h1>OBTENÉ UN 5% OFF</h1>
      <p>Suscribite a nuestro newsletter y recibí ofertas exclusivas</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Suscribirme</button>
      </form>

      {responseMessage && (
        <p
          className={`response-message ${
            responseType === "success" ? "success" : "error"
          }`}
        >
          {responseMessage}
        </p>
      )}

      <p>Seguinos en nuestras redes</p>
      <div className="socials">
        <FaFacebook className="icon" />
        <AiFillTwitterCircle className="icon" />
        <FaInstagram className="icon" />
      </div>
    </div>
  );
};
