import { motion } from "framer-motion";
import { CreditCard, Truck, RotateCcw } from "lucide-react";
import "./Service.scss";

export const Service = () => {
  const services = [
    {
      icon: CreditCard,
      title: "3 CUOTAS SIN INTERÉS",
      description: "Todas las tarjetas de crédito",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Truck,
      title: "ENVÍOS GRATIS A TODO EL PAIS",
      description: "Sin moverte de tu casa",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: RotateCcw,
      title: "CAMBIOS Y DEVOLUCIONES",
      description: "En 30 días",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <section className="service font-parkinsans">
      <motion.div
        className="service-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <div className={`icon-wrapper ${service.color}`}>
                <Icon className="service-icon" />
              </div>
              <div className="text">
                <h1>{service.title}</h1>
                <h2>{service.description}</h2>
              </div>
              <div className="card-glow"></div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};
