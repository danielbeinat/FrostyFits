import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database } from "lucide-react";

export const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-parkinsans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-lg text-gray-600">
            Tu información está segura con nosotros
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Compromiso con tu Privacidad
              </h3>
              <p className="text-gray-600">
                En FrostyFits protegemos tus datos personales
              </p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              En FrostyFits nos comprometemos a proteger y respetar tu
              privacidad. Esta política describe cómo recopilamos, utilizamos y
              protegemos tu información personal cuando navegas en nuestro sitio
              web y realizas compras.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Información que Recopilamos
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Datos personales:</strong> Nombre, email, teléfono,
                dirección
              </li>
              <li>
                • <strong>Datos de compra:</strong> Historial de pedidos,
                productos comprados
              </li>
              <li>
                • <strong>Datos de navegación:</strong> Páginas visitadas,
                tiempo en el sitio
              </li>
              <li>
                • <strong>Datos técnicos:</strong> IP, navegador, dispositivo
                utilizado
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Cómo Usamos tu Información
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Para procesar y enviar tus pedidos</li>
              <li>• Para mejorar nuestros productos y servicios</li>
              <li>• Para comunicarte sobre promociones y novedades</li>
              <li>• Para garantizar la seguridad del sitio web</li>
              <li>• Para cumplir con obligaciones legales</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Protección de tus Datos
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Encriptación SSL en todas las transacciones</li>
              <li>• Servidores seguros con acceso restringido</li>
              <li>• Políticas internas de confidencialidad</li>
              <li>• Cumplimiento con Ley de Protección de Datos</li>
              <li>• No compartimos tu información con terceros</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-blue-50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Tus Derechos
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-blue-800">
              <p>
                • <strong>Acceso:</strong> Saber qué datos tenemos sobre ti
              </p>
              <p>
                • <strong>Rectificación:</strong> Corregir datos incorrectos
              </p>
              <p>
                • <strong>Cancelación:</strong> Eliminar tus datos cuando
                quieras
              </p>
            </div>
            <div className="space-y-2 text-blue-800">
              <p>
                • <strong>Oposición:</strong> Rechazar el uso de tus datos
              </p>
              <p>
                • <strong>Portabilidad:</strong> Transferir tus datos a otro
                servicio
              </p>
              <p>
                • <strong>Información:</strong> Saber cómo usamos tus datos
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookies</h3>
          <p className="text-gray-700 mb-4">
            Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.
            Estas cookies nos permiten:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Recordar tus preferencias de navegación</li>
            <li>• Mantener tu sesión activa</li>
            <li>• Analizar el tráfico del sitio web</li>
            <li>• Ofrecerte contenido personalizado</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Puedes desactivar las cookies desde la configuración de tu navegador
            en cualquier momento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center text-gray-600"
        >
          <p className="mb-2">
            <strong>Fecha de última actualización:</strong> 1 de Enero de 2024
          </p>
          <p>
            Para ejercer tus derechos o tener dudas sobre esta política,
            contactanos en:
            <strong> privacidad@frostyfits.com</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
