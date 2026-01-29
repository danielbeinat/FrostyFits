// import { Swiper, SwiperSlide } from "swiper/react";
// import { BannerImage } from "../../UI/OptimizedImage/OptimizedImage";
// import banner1 from "/src/assets/banner1.webp";
// import banner2 from "/src/assets/banner2.webp";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "./Slider.scss";

// import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
// import { motion } from "framer-motion";
// import {
//   ChevronRight,
//   ShoppingBag,
//   Star,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";

// export const Slider = () => {
//   const slides = [
//     {
//       image: banner1,
//       title: "Colección Primavera 2024",
//       subtitle: "Descubre las tendencias que marcarán la temporada",
//       description:
//         "Prendas únicas con diseños exclusivos que combinan comodidad y estilo",
//       cta: "Explorar Colección",
//       badge: "Nuevo",
//       stats: "50+ estilos únicos",
//       gradient: "from-purple-600/20 to-pink-600/20",
//     },
//     {
//       image: banner2,
//       title: "Temporada Especial",
//       subtitle: "Ofertas exclusivas por tiempo limitado",
//       description: "Hasta 40% de descuento en nuestra colección completa",
//       cta: "Ver Ofertas",
//       badge: "Limitado",
//       stats: "Hasta 40% OFF",
//       gradient: "from-blue-600/20 to-cyan-600/20",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   return (
//     <div className="relative group">
//       <Swiper
//         style={{
//           "--swiper-navigation-size": "24px",
//           "--swiper-pagination-fontsize": "14px",
//         }}
//         spaceBetween={0}
//         effect={"fade"}
//         navigation={{
//           nextEl: ".swiper-button-next-custom",
//           prevEl: ".swiper-button-prev-custom",
//         }}
//         autoplay={{
//           delay: 7000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         loop={true}
//         speed={1200}
//         pagination={{
//           clickable: true,
//           dynamicBullets: true,
//           renderBullet: (index, className) => {
//             return `<span class="${className} custom-bullet"></span>`;
//           },
//         }}
//         modules={[EffectFade, Navigation, Pagination, Autoplay]}
//         className="hero-swiper-modern"
//         watchSlidesProgress={true}
//         preventClicks={false}
//         preventClicksPropagation={false}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative h-full w-full overflow-hidden">
//               <div
//                 className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
//                 style={{
//                   backgroundImage: `linear-gradient(135deg, ${slide.gradient})`,
//                 }}
//               ></div>

//               <BannerImage
//                 src={slide.image}
//                 alt={slide.title}
//                 className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
//               />

//               <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none"></div>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

//               {/* Content overlay */}
//               <div className="absolute inset-0 flex items-center justify-start pt-20">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pl-16 lg:pl-24">
//                   <motion.div
//                     className="max-w-xl"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     <motion.div
//                       className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold mb-4 border border-white/20 shadow-lg"
//                       initial={{ opacity: 0, x: -30, scale: 0.8 }}
//                       animate={{ opacity: 1, x: 0, scale: 1 }}
//                       transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
//                       whileHover={{
//                         scale: 1.05,
//                         backgroundColor: "rgba(255,255,255,0.2)",
//                       }}
//                     >
//                       <Sparkles className="w-3 h-3 mr-1.5 text-yellow-300" />
//                       {slide.badge}
//                     </motion.div>

//                     <motion.h1
//                       className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight"
//                       initial={{ opacity: 0, y: 40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
//                     >
//                       {slide.title.split(" ").map((word, i) => (
//                         <motion.span
//                           key={i}
//                           className="inline-block mr-2"
//                           initial={{ opacity: 0, y: 30, rotateX: -90 }}
//                           animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                           transition={{
//                             duration: 0.6,
//                             delay: 0.7 + i * 0.1,
//                             type: "spring",
//                             stiffness: 100,
//                           }}
//                           style={{ transformOrigin: "top center" }}
//                         >
//                           {word}
//                         </motion.span>
//                       ))}
//                     </motion.h1>

//                     {/* Enhanced Subtitle */}
//                     <motion.p
//                       className="text-xl md:text-2xl text-white/95 mb-3 font-light tracking-wide"
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
//                     >
//                       {slide.subtitle}
//                     </motion.p>

//                     {/* Enhanced Description */}
//                     <motion.p
//                       className="text-base md:text-lg text-white/85 mb-8 max-w-md leading-relaxed font-light"
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
//                     >
//                       {slide.description}
//                     </motion.p>

//                     <motion.div
//                       className="flex flex-col sm:flex-row gap-4"
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
//                     >
//                       <motion.button
//                         className="group relative inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-2xl hover:shadow-white/30 transition-all duration-500 text-base overflow-hidden"
//                         whileHover={{ scale: 1.05, y: -3 }}
//                         whileTap={{ scale: 0.98 }}
//                         aria-label={`Explorar ${slide.title}`}
//                         onClick={() => {
//                           const targetId =
//                             slide.cta === "Ver Ofertas"
//                               ? "novedades"
//                               : "tendencia";
//                           const section = document.getElementById(targetId);
//                           if (section) {
//                             section.scrollIntoView({
//                               behavior: "smooth",
//                               block: "start",
//                             });
//                           }
//                         }}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         <ShoppingBag className="w-5 h-5 mr-3 relative z-10" />
//                         <span className="relative z-10">{slide.cta}</span>
//                         <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//                       </motion.button>

//                       <motion.button
//                         className="inline-flex items-center px-6 py-4 border-2 border-white/40 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/10 hover:border-white/60 transition-all duration-500 text-base shadow-lg"
//                         whileHover={{ scale: 1.05, y: -3 }}
//                         whileTap={{ scale: 0.98 }}
//                         aria-label={slide.stats}
//                       >
//                         <Star className="w-4 h-4 mr-2 text-yellow-300" />
//                         {slide.stats}
//                       </motion.button>
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>

//               <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//               <div className="absolute bottom-32 left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
//               <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl animate-bounce delay-500"></div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
//         <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl">
//           <ChevronRight className="w-6 h-6 rotate-180" />
//         </button>
//       </div>

//       <div className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
//         <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl">
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
//         <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
//           <div className="h-full bg-white rounded-full animate-progress"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { ShoopContext } from "../../Context/ShoopContext";
import { useContext } from "react";
import {
  Trash2,
  ShoppingBag,
  Tag,
  ArrowRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/currency";

export const CartItems = () => {
  const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
    useContext(ShoopContext);

  if (!Array.isArray(Allproducts)) {
    console.error("Allproducts is not an array:", Allproducts);
    return <div className="text-center py-8">Loading products...</div>;
  }

  const cartItems = Allproducts.filter((item) => cart[item._id] > 0);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 font-parkinsans">
      {/* Header - Mejorado para móvil */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Tu Carrito
              </h1>
              {!isEmpty && (
                <p className="text-sm text-gray-600 mt-1">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "artículo" : "artículos"}
                </p>
              )}
            </div>
            {!isEmpty && (
              <div className="hidden sm:block">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${getTotalCartAmount().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {isEmpty ? (
          // Empty State - Mejorado
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-600 text-center mb-8 px-4">
              Descubre nuestra colección y encuentra lo que buscas
            </p>
            <Link
              to="/products"
              className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Products List - Columna principal */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* MOBILE LAYOUT */}
                  <div className="block sm:hidden">
                    <div className="relative">
                      {/* Image Header */}
                      <div className="relative bg-gray-50 p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="absolute top-6 right-6 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-all active:scale-90"
                          aria-label="Eliminar producto"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-4">
                        {/* Product Info */}
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category || "Producto"}
                          </p>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between py-3 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Precio unitario
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
                            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg min-w-[24px] text-center">
                              {cart[item._id]}
                            </span>
                            <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between py-3 bg-gray-50 rounded-xl px-4">
                          <span className="text-sm font-medium text-gray-600">
                            Subtotal
                          </span>
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(item.price * cart[item._id])}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TABLET & DESKTOP LAYOUT */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 p-6 items-center">
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 lg:w-28 lg:h-28 object-cover rounded-xl border border-gray-100"
                        />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {cart[item._id]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.category || "Producto"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <p className="text-gray-900 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-2 flex justify-center">
                      <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="font-bold min-w-[24px] text-center">
                          {cart[item._id]}
                        </span>
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center">
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(item.price * cart[item._id])}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar - Sticky en desktop, fijo abajo en móvil */}
            <div className="lg:col-span-4">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block space-y-6 sticky top-24">
                {/* Cart Summary */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
                  <h2 className="text-2xl font-bold mb-6">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>
                        Subtotal ({cartItems.length}{" "}
                        {cartItems.length === 1 ? "artículo" : "artículos"})
                      </span>
                      <span className="font-semibold">
                        ${getTotalCartAmount().toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Envío</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold">
                        GRATIS
                      </span>
                    </div>

                    <div className="h-px bg-gray-700 my-4"></div>

                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Total</span>
                      <span>${getTotalCartAmount().toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={() => window.scrollTo(0, 0)}
                    className="group block w-full bg-white text-gray-900 text-center py-4 px-6 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl mb-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Finalizar Compra
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>

                  <p className="text-center text-gray-400 text-xs">
                    🔒 Pago 100% seguro
                  </p>
                </div>

                {/* Promo Code */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={20} className="text-gray-700" />
                    <h3 className="font-bold text-gray-900">
                      ¿Tienes un cupón?
                    </h3>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Código promocional"
                      className="w-full px-4 py-3 pr-24 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 bg-gray-900 text-white px-5 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Fixed Bottom Bar */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t-2 border-gray-200 shadow-2xl">
                <div className="px-4 py-4">
                  {/* Promo Code - Colapsable en móvil */}
                  <div className="mb-4">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none py-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Tag size={18} />
                          <span>¿Tienes un cupón?</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="pt-2 pb-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Código"
                            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 text-sm"
                          />
                          <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm whitespace-nowrap">
                            Aplicar
                          </button>
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Total & CTA */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">
                        Total a pagar
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${getTotalCartAmount().toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        Envío gratis
                      </p>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex-shrink-0 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg flex items-center gap-2"
                    >
                      Pagar
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Spacer para el fixed bottom bar en móvil */}
              <div className="lg:hidden h-40"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
