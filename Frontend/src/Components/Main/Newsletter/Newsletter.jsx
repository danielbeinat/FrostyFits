import { Facebook, Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../../../config/config.js";

import "./Newsletter.scss";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setResponseMessage("Por favor, ingresa un email válido.");
      setResponseType("error");
      setIsSubmitting(false);
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
        setTimeout(() => {
          setResponseMessage("");
          setResponseType("");
        }, 5000);
      } else if (response.status === 409) {
        setResponseMessage("Este email ya está suscripto.");
        setResponseType("error");
        setTimeout(() => {
          setResponseMessage("");
          setResponseType("");
        }, 5000);
      } else {
        setResponseMessage(data.message || "Hubo un problema al suscribirte.");
        setResponseType("error");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setResponseMessage("Error al suscribirte. Por favor, intenta de nuevo.");
      setResponseType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter font-parkinsans">
      <h1 className="animate-fade-in">OBTENÉ UN 15% OFF</h1>
      <p className="animate-fade-in animation-delay-200">
        Suscribite a nuestro newsletter y recibí ofertas exclusivas
      </p>

      <form
        onSubmit={handleSubmit}
        className="form animate-fade-in animation-delay-400"
      >
        <input
          type="email"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="focus:ring-2 focus:ring-green-400 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          {isSubmitting ? "Enviando..." : "Suscribirme"}
        </button>
      </form>

      {responseMessage && (
        <p
          className={`response-message animate-slide-up ${
            responseType === "success" ? "success" : "error"
          }`}
        >
          {responseMessage}
        </p>
      )}

      <p className="animate-fade-in animation-delay-600 text-gray-300 text-lg font-medium mb-6">
        Síguenos en redes sociales
      </p>
      <div className="flex justify-center gap-4 animate-fade-in animation-delay-800">
        {[
          {
            Icon: Facebook,
            href: "#",
            color: "hover:text-blue-400",
            bgColor: "group-hover:shadow-blue-500/25",
            label: "Facebook",
          },
          {
            Icon: Instagram,
            href: "#",
            color: "hover:text-pink-400",
            bgColor: "group-hover:shadow-pink-500/25",
            label: "Instagram",
          },
          {
            Icon: Twitter,
            href: "#",
            color: "hover:text-sky-400",
            bgColor: "group-hover:shadow-sky-500/25",
            label: "Twitter",
          },
          {
            Icon: Youtube,
            href: "#",
            color: "hover:text-red-400",
            bgColor: "group-hover:shadow-red-500/25",
            label: "YouTube",
          },
          {
            Icon: Music,
            href: "#",
            color: "hover:text-gray-300",
            bgColor: "group-hover:shadow-gray-500/25",
            label: "TikTok",
          },
        ].map(({ Icon, href, color, bgColor, label }, index) => (
          <a
            key={index}
            href={href}
            className={`group relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 ${color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl ${bgColor} hover:scale-110 hover:-translate-y-1`}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center animate-fade-in animation-delay-1000">
        <p className="text-sm text-gray-400">
          Mantente al día con nuestras últimas tendencias y ofertas exclusivas
        </p>
      </div>
    </div>
  );
};
