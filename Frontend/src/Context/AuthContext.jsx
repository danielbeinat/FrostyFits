import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);
import { API_URL } from "../config/config.js";

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp > currentTime) {
          setIsAuthenticated(true);
          setUser({ id: payload.userId });
        } else {
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
