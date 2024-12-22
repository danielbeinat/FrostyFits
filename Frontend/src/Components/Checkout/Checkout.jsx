import { useState } from "react";
import { ShoopContext } from "../../Context/ShoopContext";
import React, { useContext } from "react";

export const Checkout = () => {
  const [step, setStep] = useState(1);
  const { getTotalCartAmount, Allproducts, cart } = useContext(ShoopContext);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    newsletter: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className=" mx-auto p-4 grid md:grid-cols-[1fr,400px] gap-8">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
            {step}
          </div>
          <h2 className="text-2xl font-semibold">
            {step === 1 ? "Datos Personales" : step === 2 ? "Envío" : "Pago"}
          </h2>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electronico*
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <p className="text-sm text-red-500">Este campo es obligatorio.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre*
                </label>
                <input
                  id="firstName"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellidos*
                </label>
                <input
                  id="lastName"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="dni"
                  className="block text-sm font-medium text-gray-700"
                >
                  DNI* (sin puntos ni espacios)
                </label>
                <input
                  id="dni"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.dni}
                  onChange={(e) =>
                    setFormData({ ...formData, dni: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="newsletter"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.newsletter}
                onChange={(e) =>
                  setFormData({ ...formData, newsletter: e.target.checked })
                }
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Quiero recibir e-mails con las ultimas novedades de FrostyFits,
                lanzamientos y ofertas exclusivas.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Continuar
            </button>
          </form>
        )}

        {step === 2 && <div>Shipping form content</div>}
        {step === 3 && <div>Payment form content</div>}
      </div>

      <div className="bg-white rounded-lg shadow-md h-fit">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold">Resumen de compra</h2>

          {Allproducts.map((product) => {
            if (cart[product._id] > 0) {
              return (
                <div key={product.id} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {/* {product.quantity} */}
                        {cart[product._id]}
                      </span>
                      <span className="font-medium">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}

          <div className="space-y-4 pt-4 border-t">
            <button className="flex items-center gap-2 text-sm w-full hover:text-blue-600">
              <span className="border rounded p-1">%</span>
              Ingresá tu código de descuento click aquí
            </button>
            <button className="flex items-center gap-2 text-sm w-full hover:text-blue-600">
              <span className="border rounded p-1">💳</span>
              Consultar promociones bancarias click aquí
            </button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalCartAmount().toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>{" "}
              <span>${getTotalCartAmount().toLocaleString()}</span>
            </div>
          </div>

          <button
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => window.history.back()}
          >
            Volver a carrito
          </button>
        </div>
      </div>
    </div>
  );
};
