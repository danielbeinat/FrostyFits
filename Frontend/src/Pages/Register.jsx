import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Registration successful!");
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
        // Store token and handle redirection or state management
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="min-h-screen font-parkinsans flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg w-[500px] mb-20">
        <h1 className="text-3xl font-bold mb-4">Regístrate</h1>
        <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="name"
              id="name"
              className="border w-full border-gray-300 rounded-md p-2"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              className="border w-full border-gray-300 rounded-md p-2"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="border w-full border-gray-300 rounded-md p-2"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-black w-[200px]  text-white py-2 px-4 rounded mt-4">
              Registrarse
            </button>
          </div>
        </form>
        <p className="mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link className="font-bold" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
