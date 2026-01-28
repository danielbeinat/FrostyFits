import { Swiper, SwiperSlide } from "swiper/react";
import { BannerImage } from "../../UI/OptimizedImage/OptimizedImage";
import banner1 from "/src/assets/banner1.webp";
import banner2 from "/src/assets/banner2.webp";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShoppingBag,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Slider = () => {
  const slides = [
    {
      image: banner1,
      title: "Colección Primavera 2024",
      subtitle: "Descubre las tendencias que marcarán la temporada",
      description:
        "Prendas únicas con diseños exclusivos que combinan comodidad y estilo",
      cta: "Explorar Colección",
      badge: "Nuevo",
      stats: "50+ estilos únicos",
      gradient: "from-purple-600/20 to-pink-600/20",
    },
    {
      image: banner2,
      title: "Temporada Especial",
      subtitle: "Ofertas exclusivas por tiempo limitado",
      description: "Hasta 40% de descuento en nuestra colección completa",
      cta: "Ver Ofertas",
      badge: "Limitado",
      stats: "Hasta 40% OFF",
      gradient: "from-blue-600/20 to-cyan-600/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative group">
      <Swiper
        style={{
          "--swiper-navigation-size": "24px",
          "--swiper-pagination-fontsize": "14px",
        }}
        spaceBetween={0}
        effect={"fade"}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1200}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="hero-swiper-modern"
        watchSlidesProgress={true}
        preventClicks={false}
        preventClicksPropagation={false}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${slide.gradient})`,
                }}
              ></div>

              <BannerImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-start pt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pl-16 lg:pl-24">
                  <motion.div
                    className="max-w-xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold mb-4 border border-white/20 shadow-lg"
                      initial={{ opacity: 0, x: -30, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-1.5 text-yellow-300" />
                      {slide.badge}
                    </motion.div>

                    <motion.h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    >
                      {slide.title.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block mr-2"
                          initial={{ opacity: 0, y: 30, rotateX: -90 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.7 + i * 0.1,
                            type: "spring",
                            stiffness: 100,
                          }}
                          style={{ transformOrigin: "top center" }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>

                    {/* Enhanced Subtitle */}
                    <motion.p
                      className="text-xl md:text-2xl text-white/95 mb-3 font-light tracking-wide"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Enhanced Description */}
                    <motion.p
                      className="text-base md:text-lg text-white/85 mb-8 max-w-md leading-relaxed font-light"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
                    >
                      <motion.button
                        className="group relative inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-2xl hover:shadow-white/30 transition-all duration-500 text-base overflow-hidden"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Explorar ${slide.title}`}
                        onClick={() => {
                          const targetId =
                            slide.cta === "Ver Ofertas"
                              ? "novedades"
                              : "tendencia";
                          const section = document.getElementById(targetId);
                          if (section) {
                            section.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <ShoppingBag className="w-5 h-5 mr-3 relative z-10" />
                        <span className="relative z-10">{slide.cta}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>

                      <motion.button
                        className="inline-flex items-center px-6 py-4 border-2 border-white/40 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/10 hover:border-white/60 transition-all duration-500 text-base shadow-lg"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={slide.stats}
                      >
                        <Star className="w-4 h-4 mr-2 text-yellow-300" />
                        {slide.stats}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-32 left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl animate-bounce delay-500"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
      </div>

      <div className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};
