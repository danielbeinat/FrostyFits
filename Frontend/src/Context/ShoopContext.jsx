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

  // Initialize secure utilities
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
        console.error("Invalid products data:", data);
        setAllproducts([]);
      }

      // Fetch user cart if authenticated
      if (tokenManager.isTokenValid()) {
        try {
          const cartResponse = await secureAPI.get("/api/users/getCart");

          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            setcart(cartData);
          }
        } catch (cartError) {
          // Non-critical error, don't fail the entire operation
          console.warn("Could not fetch user cart:", cartError);
        }
      }
    } catch (err) {
      setError(err.message);
      // Implement proper error reporting here
    } finally {
      setLoading(false);
    }
  }, [secureAPI, tokenManager]);

  useEffect(() => {
    FetchProduct();
  }, [FetchProduct]);

  const addToCart = useCallback(
    async (itemId, size = null, quantity = 1) => {
      // Check if user is authenticated using token validation
      if (!tokenManager.isTokenValid()) {
        throw new Error("Please login to add items to cart");
      }

      // Sanitize inputs
      const sanitizedItemId = InputSanitizer.sanitizeString(itemId);
      const sanitizedSize = size ? InputSanitizer.sanitizeString(size) : null;
      const sanitizedQuantity = InputSanitizer.sanitizeNumber(quantity, 1, 10);

      // Validation
      if (!sanitizedItemId || sanitizedQuantity < 1) {
        throw new Error("Invalid item ID or quantity");
      }

      // Optimistic update
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
          if (response.status === 401) {
            // Clear invalid token and throw error
            tokenManager.removeToken();
            throw new Error("Please login to add items to cart");
          }
          throw new Error(`Failed to add to cart: ${response.status}`);
        }

        const data = await response.json();
        // Optionally update cart with server response
        if (data.cart) {
          setcart(data.cart);
        }
      } catch (error) {
        // Rollback on error
        setcart(cart);
        throw error;
      }
    },
    [cart, secureAPI, tokenManager],
  );

  const removeFromCart = useCallback(
    async (itemId, quantity = 1) => {
      const sanitizedItemId = InputSanitizer.sanitizeString(itemId);
      const sanitizedQuantity = InputSanitizer.sanitizeNumber(quantity, 1, 10);

      if (!sanitizedItemId || sanitizedQuantity < 1) {
        throw new Error("Invalid item ID or quantity");
      }

      const currentQuantity = cart[sanitizedItemId] || 0;
      if (currentQuantity === 0) return;

      // Optimistic update
      const newQuantity = Math.max(0, currentQuantity - sanitizedQuantity);
      const newCart = { ...cart, [sanitizedItemId]: newQuantity };
      setcart(newCart);

      try {
        const response = await secureAPI.post("/api/users/removefromcart", {
          itemId: sanitizedItemId,
          quantity: sanitizedQuantity,
        });

        if (!response.ok) {
          throw new Error(`Failed to remove from cart: ${response.status}`);
        }

        const data = await response.json();
        if (data.cart) {
          setcart(data.cart);
        }
      } catch (error) {
        // Rollback on error
        setcart(cart);
        throw error;
      }
    },
    [cart, secureAPI],
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
