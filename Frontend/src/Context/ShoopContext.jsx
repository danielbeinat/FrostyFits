import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { TokenManager, InputSanitizer, SecureAPI } from "../utils/auth.js";

export const ShoopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

export const ShoopProvider = (props) => {
  const [Allproducts, setAllproducts] = useState([]);
  const [cart, setcart] = useState(getDefaultCart());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tokenManager = useMemo(() => new TokenManager(), []);
  const secureAPI = useMemo(() => new SecureAPI(tokenManager), [tokenManager]);

  const FetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await secureAPI.get("/api/products/allproducts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.products)) {
        setAllproducts(data.products);
      } else {
        setAllproducts([]);
      }

      if (tokenManager.isTokenValid()) {
        try {
          const cartResponse = await secureAPI.get("/api/users/getCart");

          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            setcart(cartData);
          }
        } catch (cartError) {
          console.warn("Could not fetch user cart:", cartError);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [secureAPI, tokenManager]);

  useEffect(() => {
    FetchProduct();
  }, [FetchProduct]);

  const addToCart = useCallback(
    async (itemId, size = null, quantity = 1) => {
      if (!tokenManager.isTokenValid()) {
        throw new Error("Please login to add items to cart");
      }

      const sanitizedItemId = InputSanitizer.sanitizeString(itemId);
      const sanitizedSize = size ? InputSanitizer.sanitizeString(size) : null;
      const sanitizedQuantity = InputSanitizer.sanitizeNumber(quantity, 1, 100);

      if (!sanitizedItemId || sanitizedQuantity < 1) {
        throw new Error("Invalid item ID or quantity");
      }

      const newCart = {
        ...cart,
        [sanitizedItemId]: (cart[sanitizedItemId] || 0) + sanitizedQuantity,
      };
      setcart(newCart);

      try {
        const response = await secureAPI.post("/api/users/addtocart", {
          itemId: sanitizedItemId,
          size: sanitizedSize,
          quantity: sanitizedQuantity,
        });

        if (!response.ok) {
          setcart(cart);
          throw new Error("Failed to update cart on server");
        }
      } catch (error) {
        setcart(cart);
        throw error;
      }
    },
    [cart, secureAPI, tokenManager],
  );

  const removeFromCart = useCallback(
    async (itemId, quantity = 1) => {
      if (!tokenManager.isTokenValid()) return;

      const sanitizedItemId = InputSanitizer.sanitizeString(itemId);
      const sanitizedQuantity = InputSanitizer.sanitizeNumber(quantity, 1, 100);

      const newCart = { ...cart };
      if (newCart[sanitizedItemId]) {
        newCart[sanitizedItemId] = Math.max(
          0,
          newCart[sanitizedItemId] - sanitizedQuantity,
        );
        if (newCart[sanitizedItemId] === 0) {
          delete newCart[sanitizedItemId];
        }
      }
      setcart(newCart);

      try {
        const response = await secureAPI.post("/api/users/removefromcart", {
          itemId: sanitizedItemId,
          quantity: sanitizedQuantity,
        });

        if (!response.ok) {
          setcart(cart);
        }
      } catch (error) {
        setcart(cart);
      }
    },
    [cart, secureAPI, tokenManager],
  );

  const getTotalCartAmount = useCallback(() => {
    let total = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let itemInfo = Allproducts.find((product) => product._id === item);
        if (itemInfo) {
          total += cart[item] * itemInfo.price;
        }
      }
    }
    return total;
  }, [cart, Allproducts]);

  const getTotalcartItems = useCallback(() => {
    let total = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        total += cart[item];
      }
    }
    return total;
  }, [cart]);

  const clearCart = useCallback(() => {
    setcart(getDefaultCart());
  }, []);

  const contextValue = useMemo(
    () => ({
      Allproducts,
      cart,
      setcart,
      loading,
      error,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getTotalcartItems,
      clearCart,
      refetch: FetchProduct,
      tokenManager,
      secureAPI,
    }),
    [
      Allproducts,
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      getTotalcartItems,
      clearCart,
      FetchProduct,
      tokenManager,
      secureAPI,
    ],
  );

  return (
    <ShoopContext.Provider value={contextValue}>
      {props.children}
    </ShoopContext.Provider>
  );
};
