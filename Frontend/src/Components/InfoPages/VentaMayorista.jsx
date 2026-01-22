import { motion } from "framer-motion";
import { Users, Package, TrendingUp, Mail } from "lucide-react";

export const VentaMayorista = () => {
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
            Venta Mayorista
          </h1>
          <p className="text-lg text-gray-600">
            Convertite en distribuidor oficial de FrostyFits
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Beneficios Exclusivos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Descuentos Mayoristas
                </h4>
                <p className="text-gray-600">
                  Hasta 50% de descuento sobre el precio de lista
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Crecimiento Conjunto
                </h4>
                <p className="text-gray-600">
                  Soporte y marketing para tu negocio
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Acceso Exclusivo
                </h4>
                <p className="text-gray-600">
                  Colecciones nuevas antes que nadie
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Atención Personalizada
                </h4>
                <p className="text-gray-600">Ejecutivo de cuenta dedicado</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Requisitos para Ser Distribuidor
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                1
              </div>
              <p className="text-gray-700">
                Poseer local comercial con mínimo 50m²
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                2
              </div>
              <p className="text-gray-700">
                Comprar mínimo inicial de 100 unidades
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                3
              </div>
              <p className="text-gray-700">
                Contar con CUIT y habilitación comercial
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                4
              </div>
              <p className="text-gray-700">
                Experiencia en retail de moda (deseable)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              Categorías Disponibles
            </h4>
            <ul className="space-y-2 text-blue-800">
              <li>• Ropa masculina y femenina</li>
              <li>• Accesorios y complementos</li>
              <li>• Calzado deportivo y casual</li>
              <li>• Colecciones de temporada</li>
              <li>• Artículos de edición limitada</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h4 className="font-semibold text-green-900 mb-4">
              Zonas de Cobertura
            </h4>
            <ul className="space-y-2 text-green-800">
              <li>• Todo el territorio nacional</li>
              <li>• Países limítrofes (Uruguay, Chile)</li>
              <li>• Envíos a todo Latinoamérica</li>
              <li>• Logística propia para grandes volúmenes</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            ¿Interesado en ser distribuidor?
          </h3>
          <p className="text-lg mb-6">
            Contacta a nuestro equipo comercial para comenzar
          </p>
          <div className="space-y-2">
            <p className="text-xl font-semibold">ventas@frostyfits.com</p>
            <p className="text-lg">+5491155680087 (Opción 2)</p>
            <p className="text-sm opacity-90">
              Horario: Lunes a Viernes 9:00 - 17:00
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
