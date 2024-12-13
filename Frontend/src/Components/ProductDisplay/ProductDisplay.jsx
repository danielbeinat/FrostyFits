import React, { useState, useContext } from "react";
import { ProductSlider } from "./ProuductSlider/ProductSlider";
import { CartModal } from "../CartModal/CartModal";
import { Link } from "react-router-dom";
import CreditCard from "../../assets/CreditCard.svg";
import { ShoopContext } from "../../Context/ShoopContext";
import { motion } from "framer-motion";

export const ProductDisplay = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const { product } = props;
  const { addToCart } = useContext(ShoopContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const sizes = product.sizes || [];
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]; // Example colors

  const handleAddToCart = () => {
    addToCart(product._id, selectedSize, 1, selectedColor);
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

          <div className="">
            <h2 className="text-sm font-semibold mb-2">SIZE:</h2>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-md transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
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
          </div>

          <div className="flex flex-col gap-3 w-full mt-6">
            <Link onClick={toggleModal}>
              <button
                className="inline-flex justify-center md:w-[350px] w-[250px] px-4 py-3 text-sm font-medium text-black border border-2 border-gray-500 rounded-md hover:bg-gray-100 transition-colors"
                onClick={handleAddToCart}
              >
                Agregar al Carrito
              </button>
            </Link>
            <Link to={"/cart"}>
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
