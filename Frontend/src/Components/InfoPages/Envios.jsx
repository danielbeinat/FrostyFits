import { motion } from "framer-motion";
import { Truck, Package, Clock, MapPin } from "lucide-react";

export const Envios = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-parkinsans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Envíos</h1>
          <p className="text-lg text-gray-600">
            Tu pedido llega rápido y seguro a cualquier parte del país
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Envío Estándar
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <strong>GRATIS</strong> en todo el país
              </li>
              <li>• 3-5 días hábiles</li>
              <li>• Seguimiento online</li>
              <li>• Entrega en domicilio</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Envío Express
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 24-48 horas hábiles</li>
              <li>• $500 adicional</li>
              <li>• Prioridad en despacho</li>
              <li>• Notificaciones en tiempo real</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Retiro en Tienda
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <strong>GRATIS</strong>
              </li>
              <li>• Retiro inmediato</li>
              <li>• Av. Rivadavia 1500 - CABA</li>
              <li>• Horario: 9:00 - 18:00</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Cobertura</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Todo el territorio nacional</li>
              <li>• Más de 2000 localidades</li>
              <li>• Zonas rurales incluidas</li>
              <li>• Coordinación especial para islas</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Proceso de Envío
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p className="text-sm text-gray-600">Confirmación del pedido</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p className="text-sm text-gray-600">Despacho del paquete</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p className="text-sm text-gray-600">En tránsito</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                4
              </div>
              <p className="text-sm text-gray-600">Entrega final</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-green-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ¿Necesitas hacer seguimiento?
          </h3>
          <p className="text-green-800">
            Una vez despachado tu pedido, recibirás un código de seguimiento por
            email para rastrear tu paquete en tiempo real.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
