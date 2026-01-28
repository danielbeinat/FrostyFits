import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "../../utils/currency";

export const Item = (props) => {
  const price = Number(props.price) || 0;
  const discountPercent = Number(props.discount) || 0;
  const discountedPrice =
    discountPercent > 0 ? price - (price * discountPercent) / 100 : price;

  const [showMessage, setShowMessage] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else {
    }
  };

  return (
    <>
      <div className="w-72 bg-white relative font-parkinsans shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={props.image}
            alt="Product"
            className="h-80 w-72 object-contain rounded-t-xl"
            loading="lazy"
          />
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {props.category}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {props.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {formatPrice(discountedPrice)}
            </p>
            {discountPercent > 0 && (
              <del className="text-sm text-gray-600 cursor-auto ml-2">
                {formatPrice(price)}
              </del>
            )}
            <div className="ml-auto">
              <Link onClick={handleFavoriteClick}>
                <Heart className="text-2xl  " />
              </Link>
            </div>
          </div>

          {discountPercent > 0 && (
            <div
              className="absolute top-0 right-5 bg-black rounded-b-xl px-1 py-3"
              aria-label={`Oferta ${discountPercent}% de descuento`}
            >
              <h1 className="text-white text-sm font-bold">
                {discountPercent}%
              </h1>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-4 flex items-center max-w-md">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Para poder agregar a favoritos debes iniciar sesión
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setShowMessage(false)}
                    className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
