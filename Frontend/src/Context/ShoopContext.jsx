// import { createContext, useState, useEffect } from "react";
// import { API_URL } from "../config/config.js";

// export const ShoopContext = createContext(null);

// const getDefaultCart = () => {
//   return {};
// };

// export const ShoopProvider = (props) => {
//   const [Allproducts, setAllproducts] = useState([]);
//   const [cart, setcart] = useState(getDefaultCart());

//   const FetchProduct = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/products/allproducts`);

//       const data = await response.json();
//       setAllproducts(data);
//       console.log(data);
//       if (localStorage.getItem("auth-token")) {
//         fetch(`${API_URL}/api/users/getCart`, {
//           method: "GET", // Cambia POST a GET
//           headers: {
//             Accept: "application/json",
//             "auth-token": `${localStorage.getItem("auth-token")}`,
//             "Content-Type": "application/json",
//           },
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             return response.json();
//           })
//           .then((data) => setcart(data))
//           .catch((error) => console.error("Error fetching cart:", error));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     FetchProduct();
//   }, []);

//   const addToCart = (itemId) => {
//     setcart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
//     if (localStorage.getItem("auth-token")) {
//       fetch(`${API_URL}/api/users/addToCart`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "auth-token": `${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itemId }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//         });
//     }
//     console.log("Cart after adding:", cart);
//   };

//   const removeFromCart = (itemId) => {
//     setcart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));

//     if (localStorage.getItem("auth-token")) {
//       fetch(`${API_URL}/api/users/removeFromCart`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "auth-token": `${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itemId }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//         });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const item in cart) {
//       if (cart[item] > 0) {
//         let itemInfo = Allproducts.find((product) => product._id === item);
//         if (itemInfo) {
//           total += cart[item] * itemInfo.price;
//         }
//       }
//     }
//     return total;
//   };

//   const getTotalcartItems = () => {
//     let total = 0;
//     for (const item in cart) {
//       if (cart[item] > 0) {
//         total += cart[item];
//       }
//     }
//     return total;
//   };

//   const contextValue = {
//     Allproducts,
//     cart,
//     setcart,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     getTotalcartItems,
//   };

//   return (
//     <ShoopContext.Provider value={contextValue}>
//       {props.children}
//     </ShoopContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/config.js";

export const ShoopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

export const ShoopProvider = (props) => {
  const [Allproducts, setAllproducts] = useState([]);
  const [cart, setcart] = useState(getDefaultCart());

  const FetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/allproducts`);
      const data = await response.json();
      setAllproducts(data);

      if (localStorage.getItem("auth-token")) {
        fetch(`${API_URL}/api/users/getCart`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setcart(data))
          .catch((error) => console.error("Error fetching cart:", error));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  const addToCart = (itemId, size, quantity = 1) => {
    setcart((prev) => {
      const newCart = { ...prev };
      const key = `${itemId}-${size}`;
      newCart[key] = (newCart[key] || 0) + quantity;
      return newCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/api/users/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, size, quantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const removeFromCart = (itemId, size, quantity = 1) => {
    setcart((prev) => {
      const newCart = { ...prev };
      const key = `${itemId}-${size}`;
      newCart[key] = Math.max((newCart[key] || 0) - quantity, 0);
      if (newCart[key] === 0) {
        delete newCart[key];
      }
      return newCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/api/users/removeFromCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, size, quantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const updateCartItemQuantity = (itemId, size, newQuantity) => {
    setcart((prev) => {
      const newCart = { ...prev };
      const key = `${itemId}-${size}`;
      if (newQuantity > 0) {
        newCart[key] = newQuantity;
      } else {
        delete newCart[key];
      }
      return newCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch(`${API_URL}/api/users/updateCartItemQuantity`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, size, quantity: newQuantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cart) {
      const [itemId, size] = key.split("-");
      const itemInfo = Allproducts.find((product) => product._id === itemId);
      if (itemInfo) {
        total += cart[key] * itemInfo.price;
      }
    }
    return total;
  };

  const getTotalcartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const contextValue = {
    Allproducts,
    cart,
    setcart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    getTotalcartItems,
  };

  return (
    <ShoopContext.Provider value={contextValue}>
      {props.children}
    </ShoopContext.Provider>
  );
};
