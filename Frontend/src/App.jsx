import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./Pages/Cart";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Product } from "./Pages/Product";
import { Category } from "./Pages/Category";
import { ChatBox } from "./Components/ChatBox/ChatBox";
import { SearchPage } from "./Pages/SearchPage";
import { Checkout } from "../src/Components/Checkout/Checkout";
import { Shirts } from "../src/Pages/ColectionClothing/Shirts";
import { Jacket } from "./Pages/ColectionClothing/Jacket";
import { Pants } from "../src/Pages/ColectionClothing/Pants";
import { Favorite } from "./Pages/Favorite";
import { Newsletter } from "./Components/Main/Newsletter/Newsletter";

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
        <Route path="/register" element={<Register />} />

        <Route path="/favorite" element={<Favorite />} />

        <Route path="/men" element={<Category category="men" />} />
        <Route path="/women" element={<Category category="women" />} />
        <Route path="/kid" element={<Category category="kid" />} />
        <Route path="/shoes" element={<Category category="shoes" />} />

        <Route path="/search/:searchQuery" element={<SearchPage />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shirts" element={<Shirts />} />
        <Route path="/jacket" element={<Jacket />} />
        <Route path="/pants" element={<Pants />} />
      </Routes>

      <ChatBox />

      <Newsletter />

      <Footer />
    </>
  );
};
