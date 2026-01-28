import { useState, useContext } from "react";
import { ShoopContext } from "../../Context/ShoopContext";
import { AuthContext } from "../../Context/AuthContext";
import { ProductSlider } from "./ProductSlider/ProductSlider";
import LoginModal from "../UI/Modal/LoginModal";
import ErrorModal from "../UI/Modal/ErrorModal";
import { CartModal } from "../CartModal/CartModal";
import { Link } from "react-router-dom";
import CreditCard from "../../assets/CreditCard.svg";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  ShoppingCart,
  Sparkles,
  Truck,
  Shield,
  Heart,
  Star,
} from "lucide-react";
import { formatPrice } from "../../utils/currency";

export const ProductDisplay = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const toggleModal = () => setIsOpen(!isOpen);

  const { product } = props;
  const { addToCart, cart } = useContext(ShoopContext);
  const { isAuthenticated } = useContext(AuthContext);
  const basePrice = Number(product.price) || 0;
  const discountPercent = Number(product.discount) || 0;
  const discountedPrice =
    discountPercent > 0
      ? basePrice - (basePrice * discountPercent) / 100
      : basePrice;

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = product.sizes || [];

  const handleAddToCart = async () => {
    if (!selectedSize && product.type !== "Gorro") {
      return;
    }

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!cart[product._id]) {
      try {
        await addToCart(product._id, selectedSize, quantity);
      } catch (error) {
        // Handle authentication error
        if (error.message === "Please login to add items to cart") {
          setShowLoginModal(true);
          return;
        }
        // Handle other errors
        setErrorModal({
          isOpen: true,
          title: "Error",
          message: error.message,
        });
        return;
      }
    }
    toggleModal();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4">
            <ProductSlider product={product} />
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                {product.name}
              </motion.h1>

              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-1"
                  variants={itemVariants}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                </motion.div>

                <motion.button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="p-2 rounded-full border border-gray-200 hover:border-red-300 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Price */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </h2>
                {discountPercent > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(basePrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg inline-flex">
                <Truck className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  Envío gratis en compras mayores a $45.000
                </p>
              </div>
            </motion.div>

            {/* Payment Options */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <img className="w-6 h-6" src={CreditCard} alt="Credit Card" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    3 cuotas sin interés de {formatPrice(discountedPrice / 3)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Hasta 6 cuotas con tarjetas seleccionadas
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Size Selection */}
            {product.type !== "Gorro" && (
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">
                    TALLE:
                  </h2>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Guía de talles
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 border-2 ${
                        selectedSize === size
                          ? "bg-black text-white border-black shadow-md transform scale-105"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:shadow-sm"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                      {selectedSize === size && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          layoutId="selectedSize"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-base font-semibold text-gray-900">
                CANTIDAD:
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>

                  <span className="font-semibold text-gray-900 min-w-[2.5rem] text-center text-sm">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                <span className="text-xs text-gray-500">
                  {product.stock
                    ? `${product.stock} disponibles`
                    : "Stock disponible"}
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3 pt-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize && product.type !== "Gorro"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-black border-2 border-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </motion.button>

              <Link to="/cart" onClick={handleAddToCart}>
                <motion.button
                  disabled={!selectedSize && product.type !== "Gorro"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-gray-900 to-black rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Comprar ahora
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      Compra Segura
                    </p>
                    <p className="text-xs text-gray-600">100% protegido</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-green-50 rounded-lg">
                  <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      Envío Rápido
                    </p>
                    <p className="text-xs text-gray-600">3-5 días hábiles</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-purple-50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      Calidad Premium
                    </p>
                    <p className="text-xs text-gray-600">Garantía de 30 días</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <CartModal open={isOpen} setOpen={setIsOpen} />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, title: "", message: "" })}
        title={errorModal.title}
        message={errorModal.message}
      />
    </>
  );
};
