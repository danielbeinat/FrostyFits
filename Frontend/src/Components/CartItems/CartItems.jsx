// import { ShoopContext } from "../../Context/ShoopContext";
// import { useContext } from "react";
// import { Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import { formatPrice } from "../../utils/currency";

// export const CartItems = () => {
//   const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
//     useContext(ShoopContext);

//   if (!Array.isArray(Allproducts)) {
//     console.error("Allproducts is not an array:", Allproducts);
//     return <div className="text-center py-8">Loading products...</div>;
//   }

//   return (
//     <div className="mx-auto px-4 py-8 pt-24 font-parkinsans">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
//           <h2>Producto</h2>
//           <h2>Nombre</h2>
//           <h2>Precio</h2>
//           <h2>Cantidad</h2>
//           <h2> Total</h2>
//           <h2>Eliminar</h2>
//         </div>

//         <div className="divide-y divide-gray-200">
//           {Allproducts.map((item) => {
//             if (cart[item._id] > 0) {
//               return (
//                 <div
//                   key={item._id}
//                   className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-gray-600">{formatPrice(item.price)}</p>
//                   <p className="bg-gray-100 px-3 py-1 rounded-full mr-28 text-center">
//                     {cart[item._id]}
//                   </p>
//                   <p className="font-semibold">
//                     {formatPrice(item.price * cart[item._id])}
//                   </p>
//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-500 hover:text-red-700 pl-4 transition-colors duration-200"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>
//       </div>

//       <div className="mt-8 flex flex-col md:flex-row justify-between items-start">
//         <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
//           <h2 className="text-2xl font-bold mb-4">Total Carrito</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>${getTotalCartAmount().toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-green-600">
//               <span>Envío</span>
//               <span>Gratis</span>
//             </div>
//             <div className="border-t pt-4 flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>${getTotalCartAmount().toLocaleString()}</span>
//             </div>
//           </div>
//           <Link
//             to="/checkout"
//             onClick={() => window.scrollTo(0, 0)}
//             className="mt-6 block w-full bg-black text-white text-center py-2 px-4 rounded-full"
//           >
//             Comprar
//           </Link>
//         </div>

//         <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Código Promocional</h2>
//           <p className="text-gray-600 mb-4">¿Tienes un cupón?</p>
//           <div className="flex md:flex-row flex-col gap-4 md:gap-0">
//             <input
//               type="text"
//               placeholder="Código promocional"
//               className="flex-grow px-4 py-2 md:rounded-l-full md:rounded-r-none rounded-full border-2 md:border-r-0 border-gray-300 focus:outline-none focus:border-black"
//             />
//             <button
//               type="submit"
//               className="bg-black text-white px-6 py-2 rounded-full md:rounded-l-none  md:rounded-r-full "
//             >
//               Aplicar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { ShoopContext } from "../../Context/ShoopContext";
import { useContext } from "react";
import { Trash2, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/currency";

export const CartItems = () => {
  const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
    useContext(ShoopContext);

  if (!Array.isArray(Allproducts)) {
    console.error("Allproducts is not an array:", Allproducts);
    return <div className="text-center py-8">Loading products...</div>;
  }

  const cartItems = Allproducts.filter((item) => cart[item._id] > 0);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-8 pt-24 font-parkinsans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tu Carrito</h1>
          <p className="text-gray-600">
            {isEmpty
              ? "No hay productos"
              : `${cartItems.length} ${cartItems.length === 1 ? "producto" : "productos"}`}
          </p>
        </div>

        {isEmpty ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-600 mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600">
                <div className="col-span-5">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-1"></div>
              </div>

              {/* Product Items */}
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl border border-gray-100"
                        />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {cart[item._id]}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.category || "Producto"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <p className="text-gray-900 font-medium">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
                        <span className="font-semibold text-gray-900">
                          {cart[item._id]}
                        </span>
                        <span className="text-gray-500 text-sm">unid.</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price * cart[item._id])}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <div className="md:col-span-1 flex justify-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6 sticky top-24 h-fit">
              {/* Cart Summary */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Resumen</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${getTotalCartAmount().toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Envío</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      Gratis
                    </span>
                  </div>

                  <div className="h-px bg-gray-700 my-4"></div>

                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span>${getTotalCartAmount().toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block w-full bg-white text-gray-900 text-center py-4 px-6 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Finalizar Compra
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>

                <p className="text-center text-gray-400 text-xs mt-4">
                  Pago 100% seguro
                </p>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={20} className="text-gray-700" />
                  <h3 className="font-bold text-gray-900">
                    Cupón de descuento
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  ¿Tienes un código promocional?
                </p>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ingresa tu código"
                    className="w-full px-4 py-3 pr-24 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-gray-900 text-white px-5 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
