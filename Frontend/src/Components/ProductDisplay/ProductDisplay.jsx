import React, { useState, useContext } from "react";
import { ProductSlider } from "./ProuductSlider/ProductSlider";
import { CartModal } from "../CartModal/CartModal";
import { Link } from "react-router-dom";
import CreditCard from "../../assets/CreditCard.svg";
import { ShoopContext } from "../../Context/ShoopContext";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const ProductDisplay = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const { product } = props;
  const { addToCart, removeFromCart, cart } = useContext(ShoopContext);

  const [selectedSize, setSelectedSize] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");

  const sizes = product.sizes || [];
  // const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]; //colors

  const handleAddToCart = () => {
    // Si no hay cantidad en el carrito, agregar 1
    if (!cart[product._id]) {
      addToCart(product._id, selectedSize, 1, selectedColor);
    }

    // No necesitamos agregar 1 más porque ya tenemos la cantidad en el carrito
    toggleModal();
  };

  return (
    <>
      <div className="flex md:gap-10 md:mx-[40px] flex-col md:flex-row mx-4 font-parkinsans">
        <div className="">
          <ProductSlider product={product} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <div className="text-[20px] font-semibold">
            <h2>${product.price.toLocaleString()}</h2>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-5 h-5" src={CreditCard} alt="" />
            <p className="text-sm text-gray-500">
              3 cuotas sin interés de $2.310,00
            </p>
          </div>

          {product.type !== "Gorro" && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">SIZE:</h2>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* <div className="mt-4">
            <h2 className="text-sm font-semibold mb-2">COLOR:</h2>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div> */}

          <div className="flex mt-4 items-center mt-4 justify-between w-32 bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
            <button
              onClick={() => removeFromCart(product._id)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 "
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="font-medium text-gray-700">
              {cart[product._id] || 0}
            </span>

            <button
              onClick={() => addToCart(product._id)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 "
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full mt-2">
            <div className="flex items-center gap-4">
              <Link onClick={toggleModal}>
                <button
                  className="inline-flex justify-center md:w-[350px] w-[250px] px-4 py-3 text-sm font-medium text-black border border-2 border-gray-500 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
                </button>
              </Link>
            </div>
            <Link to="/cart">
              <button
                className="inline-flex justify-center md:w-[350px] w-[250px] px-4 py-3 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 transition-colors"
                onClick={handleAddToCart}
              >
                Comprar ahora
              </button>
            </Link>
          </div>
        </div>
      </div>
      <CartModal open={isOpen} setOpen={setIsOpen} />
    </>
  );
};
