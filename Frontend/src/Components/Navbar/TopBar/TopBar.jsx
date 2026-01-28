import { Phone, Mail, Clock, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    text: "+57 300 123 4567",
    href: "tel:+573001234567",
    label: "Llamar ahora",
  },
  {
    icon: Mail,
    text: "contacto@tuclothing.com",
    href: "mailto:contacto@tuclothing.com",
    label: "Enviar email",
  },
  {
    icon: Clock,
    text: "Lun - Vie: 9:00 - 18:00",
    href: null,
    label: "Horarios de atención",
  },
];

export const TopBar = () => {
  return (
    <div className="bg-black border-b border-gray-800/50">
      <div className="hidden md:flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-white">
          <span className="font-medium">👋 ¡Bienvenido a nuestra tienda!</span>
        </div>

        <div className="flex items-center gap-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <item.icon className="text-gray-300 text-xs group-hover:text-white transition-colors duration-200" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-xs text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  aria-label={item.label}
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-xs text-gray-300 font-medium">
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-white">
          <MapPin className="text-gray-300 text-xs" />
          <span className="font-medium">Envío nacional</span>
        </div>
      </div>

      <div className="md:hidden bg-black border-b border-gray-800/50">
        <div className="flex items-center justify-center py-2 px-4">
          <div className="flex items-center gap-3 text-xs text-white">
            <Phone className="text-gray-300" />
            <a
              href="tel:+573001234567"
              className="font-medium hover:text-gray-300 transition-colors"
              aria-label="Llamar ahora"
            >
              +57 300 123 4567
            </a>
            <span className="text-gray-400">•</span>
            <Clock className="text-gray-300" />
            <span className="font-medium">Lun-Vie 9:00-18:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
