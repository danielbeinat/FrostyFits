import { motion } from "framer-motion";
import { RotateCcw, Calendar, Package, AlertCircle } from "lucide-react";

export const CambiosDevoluciones = () => {
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
            Cambios y Devoluciones
          </h1>
          <p className="text-lg text-gray-600">
            Tu satisfacción es nuestra prioridad
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                30 días para cambios
              </h3>
              <p className="text-gray-600">
                Tienes hasta 30 días desde la recepción del pedido
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">
                Condiciones para cambios
              </h4>
              <ul className="space-y-2 text-blue-800">
                <li>• Productos sin usar</li>
                <li>• Etiquetas originales intactas</li>
                <li>• Empaque original en buen estado</li>
                <li>• Comprobante de compra</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3">
                Proceso de cambio
              </h4>
              <ul className="space-y-2 text-purple-800">
                <li>• Contacta nuestro servicio al cliente</li>
                <li>• Recibirás una guía de devolución</li>
                <li>• Envía el producto original</li>
                <li>• Recibe tu nuevo producto</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Cambios</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Cambio por talla o color</li>
              <li>• Cambio por otro producto</li>
              <li>• Diferencia de precio a pagar/reembolsar</li>
              <li>• Envío gratis para el nuevo producto</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Devoluciones
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Reembolso completo del precio</li>
              <li>• Devolución en 5-10 días hábiles</li>
              <li>• Mismo método de pago original</li>
              <li>• Sin cargos por devolución</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-yellow-50 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <AlertCircle className="w-4 h-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Productos que no pueden ser devueltos
              </h3>
              <ul className="space-y-1 text-yellow-800">
                <li>• Productos de venta liquidación</li>
                <li>• Ropa interior por higiene</li>
                <li>• Productos personalizados</li>
                <li>• Productos con signos de uso</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            ¿Tienes dudas sobre tu cambio o devolución? <br />
            Contacta a nuestro equipo de atención al cliente:{" "}
            <strong>FrostyFits@gmail.com</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
