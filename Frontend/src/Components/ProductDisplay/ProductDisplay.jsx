// // import Rating from "@mui/material/Rating";
// // import Stack from "@mui/material/Stack";
// import { ProductSlider } from "./ProuductSlider/ProductSlider";
// import { CartModal } from "../CartModal/CartModal";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import CreditCard from "../../assets/CreditCard.svg";
// import { Minus, Plus } from "lucide-react";

// import "./ProductDisplay.scss";
// import { useContext } from "react";
// import { ShoopContext } from "../../Context/ShoopContext";
// export const ProductDisplay = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   // const sizes = ["S", "M", "L", "XL", "XXL"];
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const sizes = ["S", "M", "L", "XL", "XXL"];

//   const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
//   const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));
//   const { product } = props;
//   const { addToCart } = useContext(ShoopContext);
//   return (
//     <>
//       <div className="min-h-screen flex gap-10 mx-[90px] font-parkinsans">
//         <div className="">
//           <ProductSlider product={product} />
//         </div>
//         <div className="flex flex-col gap-4">
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           {/* <div className="star">
//             <Stack spacing={1}>
//               <Rating
//                 name="half-rating-read"
//                 defaultValue={product.rating}
//                 precision={0.5}
//                 readOnly
//               />
//             </Stack>

//             <p>({product.rating})</p>
//           </div> */}
//           <div className="text-[20px] font-semibold">
//             <h2>${product.price.toLocaleString()}</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <img className="w-5 h-5" src={CreditCard} alt="" />
//             <p className="text-sm text-gray-500">
//               3 cuotas sin interés de $2.310,00
//             </p>
//           </div>
//           {/* <div className="flex flex-col gap-2">
//             <h1 className="text-sm text-[#828282]">TALLE:</h1> */}

//           {/* <div className="flex gap-2">
//               {sizes.map((size, index) => (
//                 <p className="border border-[#C4C4C4] p-2" key={index}>
//                   {size}
//                 </p>
//               ))}
//             </div>
//           </div> */}

//           <div>
//             <h2 className="text-sm font-semibold mb-2">SIZE:</h2>
//             <div className="flex space-x-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-2 border rounded-md transition-colors ${
//                     selectedSize === size
//                       ? "bg-black text-white"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* <div className="flex flex-col">
//             <h1 className="text-sm text-[#828282]">CANTIDAD</h1>
//             <div className="flex items-center justify-between w-[120px] border border-black p-2">
//               <button className="w-5">
//                 <Minus className="w-5" />
//               </button>
//               <input
//                 className="outline-none w-5 border-none text-center "
//                 type="text"
//                 name=""
//                 id=""
//                 value={1}
//                 readOnly
//               />
//               <button className="w-5">
//                 <Plus className="w-5" />
//               </button>
//             </div>
//           </div> */}

//           <div>
//             <h2 className="text-sm font-semibold mb-2">QUANTITY:</h2>
//             <div className="flex items-center border border-gray-300 rounded-md w-32">
//               <button onClick={decrementQuantity} className="px-3 py-2">
//                 <Minus className="w-4 h-4" />
//               </button>
//               <input
//                 type="text"
//                 value={quantity}
//                 readOnly
//                 className="w-full text-center"
//               />
//               <button onClick={incrementQuantity} className="px-3 py-2">
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <Link onClick={toggleModal}>
//               <button
//                 className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md"
//                 onClick={() => addToCart(product._id)}
//               >
//                 Agregar al Carrito
//               </button>
//             </Link>
//             <Link to={"/cart"} onClick={toggleModal}>
//               <button
//                 className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md"
//                 onClick={() => addToCart(product._id)}
//               >
//                 Comprar ahora
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <CartModal open={isOpen} setOpen={setIsOpen} />
//     </>
//   );
// };

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
  const [selectedSize, setSelectedSize] = useState(null);

  // Definir tallas por tipo de producto
  const sizesByType = {
    Campera: ["S", "M", "L", "XL"],
    Pantalon: ["M", "L", "XL", "XXL"],
    Remera: ["S", "M", "L", "XL", "XXL"],
    Calzado: ["38", "39", "40", "41", "42"],
    Buzo: ["S", "M", "L", "XL"],
    Camisa: ["xs", "s", "m", "l", "xl", "xxl"],
    Bermuda: ["28", "30", "32", "34", "36"],
    Chaleco: ["S", "M", "L", "XL"],
    Gorro: null,
  };

  // Obtener las tallas basadas en el tipo de producto
  const sizes = sizesByType[product.type] || [];

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <div className="flex gap-10 mx-[40px] font-parkinsans">
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

          <div>
            <h2 className="text-sm font-semibold mb-2">SIZE:</h2>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-md transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white"
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
                className="inline-flex justify-center w-[350px] px-4 py-3 text-sm  font-medium  text-black border borde-2  border-gray-500 rounded-md"
                onClick={() => addToCart(product._id, selectedSize, quantity)} // Puedes pasar también el tamaño y la cantidad al carrito
              >
                Agregar al Carrito
              </button>
            </Link>
            <Link to={"/cart"} onClick={toggleModal}>
              <button
                className="inline-flex justify-center w-[350px] px-4 py-3 text-sm font-medium text-white bg-black border border-transparent rounded-md"
                onClick={() => addToCart(product._id, selectedSize, quantity)}
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
