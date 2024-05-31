import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

import { Cart } from "./Pages/Cart";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Product } from "./Pages/Product";
import { Category } from "./Pages/Category";
import { ChatBox } from "./Components/ChatBox/ChatBox";
import { SearchPage } from "./Pages/SearchPage";
import { Checkout } from "../src/Components/Checkout/Checkout";

export const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/hombre" element={<Category category="hombre" />} />
        <Route path="/mujer" element={<Category category="mujer" />} />
        <Route path="/chicos" element={<Category category="chicos" />} />
        <Route path="/calzado" element={<Category category="calzado" />} />

        <Route path="/search/:searchQuery" element={<SearchPage />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <ChatBox />

      <Footer />
    </>
  );
};
