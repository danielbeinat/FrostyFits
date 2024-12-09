// import { useContext } from "react";
// import "./CartItems.scss";
import { ShoopContext } from "../../Context/ShoopContext";
// import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";

// export const CartItems = () => {
//   const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
//     useContext(ShoopContext);
//   return (
//     <>
//       <div className="cart-items font-parkinsans">
//         <div className="cart-description">
//           <h1>Productos</h1>
//           <h1>Nombre</h1>
//           <h1>Precio</h1>
//           <h1>Cantidad</h1>
//           <h1> Total</h1>
//           <h1>Eliminar</h1>
//         </div>

//         <hr />
//         {Allproducts.map((item) => {
//           if (cart[item._id] > 0) {
//             return (
//               <div key={item._id} className="products">
//                 <img src={item.image} alt="" />
//                 <p>{item.name}</p>
//                 <p>${item.price.toLocaleString()}</p>
//                 <button>{cart[item._id]}</button>
//                 <p>${item.price * cart[item._id].toLocaleString()}</p>
//                 <button onClick={() => removeFromCart(item._id)}>
//                   <MdDelete size={20} />
//                 </button>
//               </div>
//             );
//           }

//           return null;
//         })}

//         <div className="cartitems-down">
//           <div className="cartitems-total">
//             <h1>Total Carrito</h1>
//             <div>
//               <div className="cartitems-total-item">
//                 <p>Subtotal</p>
//                 <p>$ {getTotalCartAmount().toLocaleString()}</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <p>Envio</p>
//                 <p>Gratis</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <p>Total</p>
//                 <p>$ {getTotalCartAmount().toLocaleString()}</p>
//               </div>
//             </div>

//             <Link
//               className="bg-black text-white text-center p-2 rounded w-32"
//               to={"/checkout"}
//               onClick={() => windows.scrollTo(0, 0)}
//             >
//               comprar
//             </Link>
//           </div>

//           <div className="promo">
//             <p>¿Tenés un código de descuento?</p>
//             <div className="sendcode">
//               <input type="text" placeholder="Código promocional" />
//               <button type="submit">Aplicar</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export const CartItems = () => {
  const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
    useContext(ShoopContext);

  return (
    <div className="mx-auto px-4 py-8  font-parkinsans">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
          <h2>Producto</h2>
          <h2>Nombre</h2>
          <h2>Precio</h2>
          <h2>Cantidad</h2>
          <h2> Total</h2>
          <h2>Eliminar</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {Allproducts.map((item) => {
            if (cart[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.price.toLocaleString()}
                  </p>
                  <p className="bg-gray-100 px-3 py-1 rounded-full mr-28 text-center">
                    {cart[item._id]}
                  </p>
                  <p className="font-semibold">
                    ${(item.price * cart[item._id]).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 pl-4 transition-colors duration-200"
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Total Carrito</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalCartAmount().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${getTotalCartAmount().toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            onClick={() => window.scrollTo(0, 0)}
            className="mt-6 block w-full bg-black text-white text-center py-2 px-4 rounded-full"
          >
            Comprar
          </Link>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Código Promocional</h2>
          <p className="text-gray-600 mb-4">¿Tienes un cupón?</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Código promocional"
              className="flex-grow px-4 py-2 rounded-l-full border-2 border-r-0 border-gray-300 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-r-full"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
