import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.js";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
        alert("Login successful!");
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen font-parkinsans flex items-center justify-center ">
      <div className="text-center bg-white p-8 rounded-lg w-[500px] mb-20">
        <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
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
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <button
              className="bg-black w-[200px]  text-white py-2 px-4 rounded mt-4"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <p className="mt-4">
          ¿No tienes una cuenta?{" "}
          <Link className="font-bold " to="/register">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
