import { ShoopContext } from "../../Context/ShoopContext";
import React, { useContext } from "react";

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
