import { useContext } from "react";
import { ShoopContext } from "../../Context/ShoopContext";

export const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShoopContext);
  return (
    <>
      <div className="cart-items flex gap-10 flex-col md:flex-row">
        <div className="flex flex-col gap-10 md:w-[750px]">
          <div className="flex flex-col gap-4  w-full">
            <h1>1 - Email </h1>
            <input
              className="md:w-[400px] rounded-full p-2 border border-black"
              type="text"
            />
            <button className="bg-black text-white p-2 rounded w-32">
              Siguiente
            </button>
          </div>
          <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
            2 - Datos personales
          </div>
          <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
            3 - Entrega
          </div>
          <div className="bg-gray-100 text-sm p-5 uppercase border-l-4 border-black w-full">
            4 - Pago
          </div>
        </div>
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Total Carrito</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount().toLocaleString()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Envio</p>
                <p>Gratis</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Total</p>
                <p>$ {getTotalCartAmount().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
