import { createContext, useState } from "react";
import { Allproducts } from "../assets/allProducts/allProducts.js";

export const ShoopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < Allproducts.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShoopProvider = (props) => {
  const [cart, setcart] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setcart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cart);
  };

  const removeFromCart = (itemId) => {
    setcart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let itemInfo = Allproducts.find(
          (product) => product.id === Number(item)
        );
        total += cart[item] * itemInfo.price;
      }
    }
    return total;
  };

  const getTotalcartItems = () => {
    let total = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        total += cart[item];
      }
    }
    return total;
  };

  const contextValue = {
    Allproducts,
    cart,
    setcart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalcartItems,
  };

  return (
    <ShoopContext.Provider value={contextValue}>
      {props.children}
    </ShoopContext.Provider>
  );
};
