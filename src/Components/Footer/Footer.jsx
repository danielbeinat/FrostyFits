import "./Footer.scss";
import logo from "../../assets/logo.png";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
          <p>
            Sumérgete en la esencia de nuestra marca y descubre las nuevas
            propuestas que revitalizan este clásico atemporal en cada una de
            nuestras colecciones.
          </p>

          <p>© FrostyFits. Todos los derechos reservados.</p>
        </div>
        <div className="footer-content">
          <h1>contenido</h1>
          <ul>
            <li>
              <a href="">Contacto</a>
            </li>
            <li>
              <a href="">Formas de pago</a>
            </li>

            <li>
              <a href="">Formas de envío</a>
            </li>
            <li>
              <a href="">Cambios y Devoluciones</a>
            </li>
          </ul>
        </div>

        <div className="footer-ask">
          <h1>Preguntas Frecuentes</h1>
          <ul>
            <li>
              <a href="">Locales</a>
            </li>
            <li>
              <a href="">Venta Mayorista</a>
            </li>

            <li>
              <a href="">Política de Privacidad</a>
            </li>
            <li>
              <a href="">Términos y Condiciones</a>
            </li>
          </ul>
        </div>
        <div className="footer-map">
          <h1>Sucursal Tienda</h1>

          <ul>
            <li>
              <FaWhatsapp className="icon" />

              <span>5491155680087</span>
            </li>
            <li>
              <FaPhone className="icon" />
              <span>Taller +541154545500</span>
            </li>

            <li>
              <IoIosMail className="icon" />
              <span>FrostyFits@gmail.com</span>
            </li>
            <li>
              <FaMapMarkerAlt className="icon" />
              <span>Av. Rivadavia 1500 - CABA</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
