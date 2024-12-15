// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { API_URL } from "../config/config.js";

// export const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (data.success) {
//         alert("Login successful!");
//         localStorage.setItem("auth-token", data.token);
//         window.location.replace("/");
//       } else {
//         alert(data.msg);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen font-parkinsans flex items-center justify-center ">
//       <div className="text-center bg-white p-8 rounded-lg w-[500px] mb-20">
//         <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
//         <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-4 w-full">
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="border w-full border-gray-300 rounded-md p-2"
//               placeholder="Correo electrónico"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="border w-full border-gray-300 rounded-md p-2"
//               placeholder="Contraseña"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col gap-4 w-full items-center justify-center">
//             <button
//               className="bg-black w-[200px]  text-white py-2 px-4 rounded mt-4"
//               type="submit"
//             >
//               Iniciar sesión
//             </button>
//           </div>
//         </form>
//         <p className="mt-4">
//           ¿No tienes una cuenta?{" "}
//           <Link className="font-bold " to="/register">
//             Regístrate
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { API_URL } from "../config/config";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-600 mt-2">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 border-t border-gray-200"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="nombre@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            // className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium text-black ">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
