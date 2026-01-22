//si el usuario no esta logueado no muestra la lista de deseos

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);
import { API_URL } from "../config/config.js";

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Almacena datos del usuario si es necesario

  // Verifica si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        // Simple JWT validation without API call
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp > currentTime) {
          setIsAuthenticated(true);
          // Optionally decode user info from token if available
          setUser({ id: payload.userId });
        } else {
          // Token expired
          localStorage.removeItem("auth-token");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token format:", error);
        localStorage.removeItem("auth-token");
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("auth-token", data.token);
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
