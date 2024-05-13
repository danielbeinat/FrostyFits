import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShoopProvider } from "./Context/ShoopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShoopProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ShoopProvider>
);
