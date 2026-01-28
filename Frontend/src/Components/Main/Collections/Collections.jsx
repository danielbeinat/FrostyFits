import { Link } from "react-router-dom";
import { collectionData } from "/src/assets/Collections/Collections.js";
import { motion } from "framer-motion";

const CategoryCard = ({ name, image, to }) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
  >
    <Link to={to} className="block" onClick={() => window.scrollTo(0, 0)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-500"></div>
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-6 text-white">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h2 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
              {name}
            </h2>
            <div className="flex items-center group/link">
              <span className="text-sm font-semibold tracking-wide">
                EXPLORAR
              </span>
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover/link:bg-white/30 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-white transform transition-transform group-hover/link:translate-x-1 duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
        <div className="w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
      </div>
    </Link>
  </motion.div>
);

export const Collections = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Nuestras Colecciones
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra selección de prendas destacadas para cada estilo y
            momento
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {collectionData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard
                name={category.name}
                image={category.image}
                to={category.to}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
