// import { useContext } from "react";
import { ShoopContext } from "../../Context/ShoopContext";

// export const Checkout = () => {
//   const { getTotalCartAmount } = useContext(ShoopContext);
//   return (
//     <>
//       <div className="cart-items font-parkinsans flex gap-10 flex-col md:flex-row">
//         <div className="flex flex-col gap-10 md:w-[750px]">
//           <div className="flex flex-col gap-4  w-full">
//             <h1>1 - Email </h1>
//             <input
//               className="md:w-[400px] rounded-full p-2 border border-black"
//               type="text"
//             />
//             <button className="bg-black text-white p-2 rounded w-32">
//               Siguiente
//             </button>
//           </div>
//           <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
//             2 - Datos personales
//           </div>
//           <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
//             3 - Entrega
//           </div>
//           <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
//             4 - Pago
//           </div>
//         </div>
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
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";

export const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShoopContext);

  return (
    <div className="mx-auto font-parkinsans px-4 py-8 ">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-8">
          <section className="bg-white shadow-md space-x-4 rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-lg font-bold mb-4">1. Email</h2>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="w-full lg:w-2/3 px-4 py-2 rounded-full border-2 border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
            />
            <button className="mt-4 bg-black text-white font-semibold py-2 px-6 rounded-full ">
              Siguiente
            </button>
          </section>

          {["Informacion Personal", "Entrega", "Pago"].map((step, index) => (
            <section
              key={index}
              className="bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:bg-gray-200"
            >
              <h2 className="text-[16px] font-semibold uppercase tracking-wider">
                {`${index + 2}. ${step}`}
              </h2>
            </section>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};
