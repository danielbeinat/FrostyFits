import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <footer className="relative bg-white text-gray-800 overflow-hidden border-t border-gray-200 font-parkinsans">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">FrostyFits</h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Sumérgete en la esencia de nuestra marca y descubre las nuevas
              propuestas que revitalizan este clásico atemporal en cada una de
              nuestras colecciones.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com",
                  color: "hover:text-blue-600",
                  bg: "hover:bg-blue-50",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com",
                  color: "hover:text-pink-600",
                  bg: "hover:bg-pink-50",
                },
                {
                  Icon: Twitter,
                  href: "https://www.twitter.com",
                  color: "hover:text-sky-600",
                  bg: "hover:bg-sky-50",
                },
                {
                  Icon: Youtube,
                  href: "https://www.youtube.com",
                  color: "hover:text-red-600",
                  bg: "hover:bg-red-50",
                },
              ].map(({ Icon, href, color, bg }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 ${color} ${bg} transition-all duration-300 border border-gray-200 hover:border-current`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6 text-gray-900">
              Enlaces Útiles
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Contacto", href: "/contacto" },
                { name: "Formas de Pago", href: "/formas-pago" },
                { name: "Envíos", href: "/envios" },
                {
                  name: "Cambios y Devoluciones",
                  href: "/cambios-devoluciones",
                },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group text-left w-full"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6 text-gray-900">
              Información
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Locales", href: "/locales" },
                { name: "Venta Mayorista", href: "/venta-mayorista" },
                {
                  name: "Política de Privacidad",
                  href: "/politica-privacidad",
                },
                {
                  name: "Términos y Condiciones",
                  href: "/terminos-condiciones",
                },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center group text-left w-full"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-6 text-gray-900">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">WhatsApp</p>
                  <p className="text-gray-900 font-medium">5491155680087</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Teléfono</p>
                  <p className="text-gray-900 font-medium">+541154545500</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">
                    FrostyFits@gmail.com
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Dirección</p>
                  <p className="text-gray-900 font-medium">
                    Av. Rivadavia 1500 - CABA
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} FrostyFits. Todos los derechos reservados.
            </p>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Tienda Online</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
