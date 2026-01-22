import { motion } from "framer-motion";
import { FileText, ShoppingCart, Shield, AlertCircle } from "lucide-react";

export const TerminosCondiciones = () => {
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
            Términos y Condiciones
          </h1>
          <p className="text-lg text-gray-600">
            Condiciones de uso de nuestros servicios
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
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Términos de Servicio
              </h3>
              <p className="text-gray-600">
                Al usar FrostyFits, aceptas estos términos
              </p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Bienvenido a FrostyFits. Estos términos y condiciones rigen el uso
              de nuestro sitio web, la compra de productos y los servicios que
              ofrecemos. Al acceder y utilizar nuestros servicios, aceptas
              cumplir con estos términos.
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
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Condiciones de Compra
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Precios:</strong> Los precios mostrados incluyen IVA
              </li>
              <li>
                • <strong>Stock:</strong> Sujeto a disponibilidad
              </li>
              <li>
                • <strong>Pagos:</strong> Procesamiento seguro de pagos
              </li>
              <li>
                • <strong>Confirmación:</strong> Recibirás email de confirmación
              </li>
              <li>
                • <strong>Facturación:</strong> Factura electrónica incluida
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Garantías y Devoluciones
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Garantía:</strong> 30 días por defectos de fabricación
              </li>
              <li>
                • <strong>Devoluciones:</strong> 30 días desde la recepción
              </li>
              <li>
                • <strong>Condición:</strong> Productos sin usar, con etiquetas
              </li>
              <li>
                • <strong>Reembolso:</strong> 5-10 días hábiles
              </li>
              <li>
                • <strong>Costos:</strong> Envío de devolución por nuestra
                cuenta
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Limitaciones de Responsabilidad
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>
                • No nos responsabilizamos por uso inadecuado de productos
              </li>
              <li>• Limitamos responsabilidad al monto de la compra</li>
              <li>• No garantizamos disponibilidad permanente</li>
              <li>• Nos reservamos derechos de modificar precios</li>
              <li>• Limitaciones aplicables según legislación vigente</li>
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
            Propiedad Intelectual
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>• Todo el contenido del sitio web es propiedad de FrostyFits</p>
            <p>• Marcas, logos y diseños están registrados</p>
            <p>• Prohibida la reproducción sin autorización</p>
            <p>• Las imágenes de productos son referenciales</p>
            <p>• Los colores pueden variar según pantalla</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Uso del Sitio Web
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Permitido:</strong>
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Navegar y comprar productos</li>
              <li>• Compartir contenido en redes sociales</li>
              <li>• Dejar reseñas y comentarios</li>
            </ul>

            <p className="mt-3">
              <strong>Prohibido:</strong>
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Uso comercial sin autorización</li>
              <li>• Copiar o distribuir contenido</li>
              <li>• Intentar hackear o dañar el sitio</li>
              <li>• Publicar contenido ofensivo o ilegal</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-yellow-50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">
            Modificaciones de los Términos
          </h3>
          <p className="text-yellow-800">
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las modificaciones entrarán en vigor desde su publicación
            en el sitio web. Te recomendamos revisar periódicamente esta
            sección.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ley Aplicable y Jurisdicción
          </h3>
          <p className="text-gray-700">
            Estos términos se rigen por las leyes de la República Argentina.
            Cualquier disputa será resuelta en los tribunales de la Ciudad
            Autónoma de Buenos Aires.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-8 text-center text-gray-600"
        >
          <p className="mb-2">
            <strong>Fecha de última actualización:</strong> 1 de Enero de 2024
          </p>
          <p>
            Para dudas sobre estos términos, contactanos en:
            <strong> legal@frostyfits.com</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
