import { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte?",
      time: new Date(),
    },
  ]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  }, [messages]);

  const responses = {
    "¿Cuál es el costo de envío?":
      "🚚 El costo de envío es GRATIS en compras mayores a $50.000. Para compras menores, el costo es de $2.500 en todo el país.",
    "¿Tienen cambios y devoluciones?":
      "🔄 ¡Sí! Tienes 30 días para hacer cambios o devoluciones. Los productos deben estar en perfectas condiciones y con etiquetas originales.",
    "¿Cuánto tardan en llegar?":
      "⏰ Los envíos tardan 3-5 días hábiles. En Buenos Aires y principales ciudades puedes recibirlo en 24-48 horas.",
    "Quiero hacer un pedido":
      "🛒 ¡Genial! Puedes hacer tu pedido directamente desde nuestra tienda online. Si necesitas ayuda, puedes contactarnos al +57 300 123 4567.",
  };

  const handleQuickQuestion = (question) => {
    // Agregar pregunta del usuario
    const userMessage = {
      type: "user",
      text: question,
      time: new Date(),
    };

    // Agregar respuesta del bot
    const botMessage = {
      type: "bot",
      text:
        responses[question] ||
        "Gracias por tu pregunta. Te contactaremos pronto con una respuesta detallada.",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Agregar mensaje del usuario
      const userMessage = {
        type: "user",
        text: message,
        time: new Date(),
      };

      // Verificar si es una pregunta rápida
      const botResponse =
        responses[message] ||
        "¡Gracias por tu mensaje! 📝 Un miembro de nuestro equipo te responderá a la brevedad.";

      const botMessage = {
        type: "bot",
        text: botResponse,
        time: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
      setMessage("");
    }
  };

  const quickQuestions = [
    "¿Cuál es el costo de envío?",
    "¿Tienen cambios y devoluciones?",
    "¿Cuánto tardan en llegar?",
    "Quiero hacer un pedido",
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-black rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/15 animate-ping"></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-white/8 animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
            💬
          </span>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-72 max-w-[calc(100vw-1rem)] bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="bg-black text-white p-3 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">¡Hola! 👋</h3>
                <p className="text-xs opacity-90">¿En qué podemos ayudarte?</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-3 max-h-80 overflow-y-auto chat-scroll">
            {/* Messages */}
            <div className="space-y-2 mb-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg text-xs ${
                      msg.type === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 opacity-70 ${
                        msg.type === "user" ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {msg.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />

            {/* Quick Questions */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1.5 font-medium">
                Preguntas frecuentes:
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-left p-1.5 bg-gray-50 hover:bg-gray-100 rounded text-xs text-gray-700 transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2.5 rounded-lg">
              <p className="text-xs font-medium text-gray-700 mb-1.5">
                📞 Contacto directo:
              </p>
              <div className="space-y-0.5 text-xs">
                <p className="flex items-center text-gray-600">
                  <span className="mr-1.5">📱</span>
                  <a
                    href="tel:+573001234567"
                    className="hover:text-blue-600 transition-colors"
                  >
                    +57 300 123 4567
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-1.5">✉️</span>
                  <a
                    href="mailto:contacto@tuclothing.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    contacto@tuclothing.com
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-1.5">🕒</span>
                  Lun - Vie: 9:00 - 18:00
                </p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
