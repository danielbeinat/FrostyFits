import { useState, useEffect } from "react";
import { BsChatRightFill } from "react-icons/bs";
import "./ChatBox.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MessageCircle, Send } from "lucide-react";
import { API_URL } from "../../config/config.js";

export const ChatBox = () => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    let timeout;
    if (!show) {
      timeout = setTimeout(() => {
        setShowButton(true);
      }, 500);
    } else {
      setShowButton(false);
    }
    return () => clearTimeout(timeout);
  }, [show]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setResponseMessage("Por favor, completa todos los campos.");
      setTimeout(() => setResponseMessage(""), 5000);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/subscribers/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await response.json(); // Asegúrate de usar await aquí.

      if (response.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
      }

      // Limpiar los campos del formulario
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setResponseMessage(""), 5000);
    } catch (error) {
      console.error("Error en el envío del correo:", error);
      setResponseMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
      setTimeout(() => setResponseMessage(""), 5000);
    }
  };

  return (
    <>
      {showButton && (
        <div
          className="fixed flex items-center z-40 justify-center p-5 lg:bottom-5 bottom-4 right-4 lg:right-5 bg-black rounded-b-full rounded-tl-full rounded-tr-lg cursor-pointer shadow-lg"
          onClick={() => setShow(!show)}
        >
          <BsChatRightFill className="w-6 h-6 text-white" />
        </div>
      )}
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="chat-box " timeout={300} unmountOnExit>
            <div className="fixed font-parkinsans lg:bottom-5 shadow-lg lg:right-5 z-50 lg:w-96 lg:h-auto bottom-0 w-full h-full right-0  rounded-lg ">
              <div className="flex items-center rounded-t-lg p-3 justify-between bg-black">
                <h1 className="text-white text-sm font-bold text-center">
                  Dejar un mensaje
                </h1>
                <button onClick={() => setShow(!show)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex bg-white flex-col p-5 py-4 pb-5 rounded-b-lg ">
                <form onSubmit={HandleSubmit} className="mt-4 space-y-4 ">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-600 pr-[2px]">*</span>Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      placeholder="Tu nombre"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 block text-sm w-full p-1 rounded-md border-2 border-[#E4E4E7] shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                    />
                    {/* {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )} */}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-600 pr-[2px]">*</span>Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@gmail.com"
                      required
                      className="mt-1 block text-sm w-full p-1 rounded-md border-2 border-[#E4E4E7] shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                    />
                    {/* {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )} */}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ¿Cómo podemos ayudarte?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      required
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tu mensaje"
                      className="mt-1 block text-sm p-1 w-full rounded-md border-2 border-[#E4E4E7] shadow-sm "
                    ></textarea>
                    {/* {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )} */}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>

      <div>
        {responseMessage && (
          <div className="fixed z-50 bottom-5 right-5 bg-green-500 p-3 rounded text-white">
            {responseMessage}
          </div>
        )}
      </div>
    </>
  );
};
