import { useState, useEffect } from "react";
import { BsChatRightFill } from "react-icons/bs";
import "./ChatBox.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const ChatBox = () => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

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

  return (
    <>
      {showButton && (
        <div
          className="fixed flex items-center z-40 justify-center p-5 lg:bottom-7 bottom-4 right-4 lg:right-5 bg-gray-800 rounded-b-full rounded-tl-full rounded-tr-lg cursor-pointer shadow-lg"
          onClick={() => setShow(!show)}
        >
          <BsChatRightFill className="w-6 h-6 text-white" />
        </div>
      )}
      <TransitionGroup>
        {show && (
          <CSSTransition classNames="chat-box" timeout={300} unmountOnExit>
            <div className="fixed lg:bottom-5 shadow-lg lg:right-5 z-50 lg:w-96 lg:h-auto bottom-0 w-full h-full right-0 bg-gray-800 rounded ">
              <div className="flex items-center p-3 justify-between">
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
              <div className="flex bg-white flex-col p-5 py-4 pb-5">
                <form className="flex flex-col gap-6" action="">
                  <fieldset className="flex flex-col gap-3">
                    <label className="font-bold text-sm" htmlFor="Nombre">
                      Nombre
                    </label>
                    <input
                      className="rounded p-2 border-2 border-gray-300"
                      type="text"
                    />
                  </fieldset>
                  <fieldset className="flex flex-col gap-3">
                    <label className="font-bold text-sm" htmlFor="Email">
                      Dirección de correo electrónico
                    </label>
                    <input
                      className="rounded p-2 border-2 border-gray-300"
                      type="text"
                    />
                  </fieldset>
                  <fieldset className="flex flex-col gap-3">
                    <label className="font-bold text-sm" htmlFor="mensaje">
                      ¿Cómo podemos ayudar?
                    </label>
                    <textarea
                      className="rounded p-2 border-2 border-gray-300 resize-none h-24 "
                      name=""
                      id=""
                    ></textarea>
                  </fieldset>
                </form>
              </div>
              <div className="flex justify-end p-5 bg-white rounded-b">
                <button className="p-2 bg-gray-800 text-white rounded bg-gray-800">
                  Enviar
                </button>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};
