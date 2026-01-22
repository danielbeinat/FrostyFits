import { motion } from "framer-motion";
import { CreditCard, Smartphone, Wallet, Banknote } from "lucide-react";

export const FormasPago = () => {
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
            Formas de Pago
          </h1>
          <p className="text-lg text-gray-600">
            Métodos de pago seguros y convenientes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Tarjetas de Crédito
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Visa, Mastercard, American Express</li>
              <li>• 3 cuotas sin interés</li>
              <li>• Hasta 12 cuotas con otras tarjetas</li>
              <li>• Pago seguro con encriptación SSL</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Billeteras Digitales
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Mercado Pago</li>
              <li>• Ualá</li>
              <li>• Modo</li>
              <li>• Transferencia bancaria</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Financiación
              </h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Ahora 3, 6, 12, 18</li>
              <li>• Planes de pago personalizados</li>
              <li>• Aprobación instantánea</li>
              <li>• Sin comisiones ocultas</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Banknote className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Efectivo</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Pago en locales</li>
              <li>• Pago contra entrega</li>
              <li>• Descuentos especiales en efectivo</li>
              <li>• Comprobante fiscal garantizado</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-blue-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            ¿Tienes dudas sobre tus pagos?
          </h3>
          <p className="text-blue-800">
            Nuestro equipo de atención al cliente está disponible para ayudarte
            con cualquier consulta sobre tus métodos de pago preferidos.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
