import React, { useState, useContext } from "react";
import { ProductSlider } from "./ProuductSlider/ProductSlider";
import { CartModal } from "../CartModal/CartModal";
import { Link } from "react-router-dom";
import CreditCard from "../../assets/CreditCard.svg";
import { Minus, Plus } from "lucide-react";
import { ShoopContext } from "../../Context/ShoopContext";

export const ProductDisplay = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const { product } = props;
  const { addToCart } = useContext(ShoopContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = product.sizes || []; // Asegúrate de que 'sizes' venga del producto

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    addToCart(product._id, selectedSize, quantity);
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
              {/* 3 cuotas sin interés de ${product.price / 3} */}3 cuotas sin
              interés de $2.310,00
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

          <div>
            <h2 className="text-sm font-semibold mb-2">QUANTITY:</h2>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button onClick={decrementQuantity} className="px-3 py-2">
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-full text-center"
              />
              <button onClick={incrementQuantity} className="px-3 py-2">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {quantity >= 8 && (
            <div>
              <h2 className="text-sm font-semibold mb-2">
                El máximo de compra es 8.
              </h2>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <Link onClick={toggleModal}>
              <button
                className="inline-flex justify-center md:w-[350px] w-[250px] px-4 py-3 text-sm  font-medium  text-black border borde-2  border-gray-500 rounded-md"
                onClick={handleAddToCart}
              >
                Agregar al Carrito
              </button>
            </Link>
            <Link to={"/cart"}>
              <button
                className="inline-flex justify-center md:w-[350px] w-[250px] px-4 py-3 text-sm font-medium text-white bg-black border border-transparent rounded-md"
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
