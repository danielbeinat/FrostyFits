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
      // Lógica para verificar el token, por ejemplo, llamando a un endpoint de validación
      fetch(`${API_URL}/api/users/validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isValid) {
            setIsAuthenticated(true);
            setUser(data.user); // Datos del usuario opcionales
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
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
