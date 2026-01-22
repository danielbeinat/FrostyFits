import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config/config.js";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { value: "women", label: "Women", icon: "👩" },
    { value: "men", label: "Men", icon: "👨" },
    { value: "kid", label: "Kids", icon: "👶" },
    { value: "shoes", label: "Shoes", icon: "👟" },
  ]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/allproducts`);
      const data = await response.json();
      setProducts(data || []);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Failed to load products", "error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Add product
  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts(); // Refresh products
        showNotification("Product added successfully!", "success");
        return { success: true };
      } else {
        showNotification("Failed to add product", "error");
        return { success: false };
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification("Error adding product", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...productData }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts(); // Refresh products
        showNotification("Product updated successfully!", "success");
        return { success: true };
      } else {
        showNotification("Failed to update product", "error");
        return { success: false };
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification("Error updating product", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/removeproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts(); // Refresh products
        showNotification("Product deleted successfully!", "success");
        return { success: true };
      } else {
        showNotification("Failed to delete product", "error");
        return { success: false };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Error deleting product", "error");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Get product statistics
  const getStats = () => {
    const totalProducts = products.length;
    const totalStock = products.reduce(
      (sum, product) => sum + (product.stock || 0),
      0,
    );
    const lowStockProducts = products.filter(
      (product) => (product.stock || 0) < 10,
    ).length;
    const categoriesBreakdown = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalProducts,
      totalStock,
      lowStockProducts,
      categories: categoriesBreakdown,
    };
  };

  // Search products
  const searchProducts = (query) => {
    if (!query.trim()) return products;

    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.type.toLowerCase().includes(lowercaseQuery),
    );
  };

  // Filter products
  const filterProducts = (filters) => {
    return products.filter((product) => {
      if (
        filters.category &&
        filters.category !== "all" &&
        product.category !== filters.category
      ) {
        return false;
      }
      if (
        filters.type &&
        filters.type !== "all" &&
        product.type !== filters.type
      ) {
        return false;
      }
      if (filters.search && filters.search.trim()) {
        const searchQuery = filters.search.toLowerCase();
        return product.name.toLowerCase().includes(searchQuery);
      }
      return true;
    });
  };

  const value = {
    products,
    categories,
    loading,
    notification,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    showNotification,
    getStats,
    searchProducts,
    filterProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
