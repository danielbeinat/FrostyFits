import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

import "./Newsletter.scss";

const HandlerSubmit = (e) => {
  e.preventDefault();
};

export const Newsletter = () => {
  return (
    <>
      <div className="newsletter">
        <h1>OBTENÉ UN 5% OFF</h1>
        <p>Suscribite a nuestro newsletter y recibí ofertas exclusivas</p>

        <form onSubmit={HandlerSubmit} className="form">
          <input type="text" placeholder=" Ingresá tu email" />
          <button type="submit">Suscribirme</button>
        </form>

        <p>Seguinos en nuestras redes</p>
        <div className="socials">
          <FaFacebook className="icon" />

          <AiFillTwitterCircle className="icon" />
          <FaInstagram className="icon" />
        </div>
      </div>
    </>
  );
};
