import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.webp";

export function Footer() {
  return (
    <footer className="bg-white text-gray-800 font-parkinsans">
      <div className=" mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <img
              src={Logo}
              alt="Logo"
              width={200}
              height={60}
              className=" p-2 rounded-md"
            />
            <p className="text-sm text-gray-600">
              Sumérgete en la esencia de nuestra marca y descubre las nuevas
              propuestas que revitalizan este clásico atemporal en cada una de
              nuestras colecciones.
            </p>
            <p className="text-xs text-gray-500">
              © FrostyFits. Todos los derechos reservados.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Contenido
            </h2>
            <ul className="space-y-2">
              {[
                "Contacto",
                "Formas de pago",
                "Formas de envío",
                "Cambios y Devoluciones",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Preguntas Frecuentes
            </h2>
            <ul className="space-y-2">
              {[
                "Locales",
                "Venta Mayorista",
                "Política de Privacidad",
                "Términos y Condiciones",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Sucursal Tienda
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-gray-600" />
                <span>5491155680087</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>Taller +541154545500</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-600" />
                <span>FrostyFits@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>Av. Rivadavia 1500 - CABA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
