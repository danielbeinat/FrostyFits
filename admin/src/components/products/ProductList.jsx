import { useState, useEffect, useMemo } from "react";
import { API_URL } from "../../config/config.js";
import { EditProduct } from "../forms/EditProduct";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const itemsPerPage = 12;

  const categories = [
    { value: "all", label: "All Categories", icon: "📦" },
    { value: "women", label: "Women", icon: "👩" },
    { value: "men", label: "Men", icon: "👨" },
    { value: "kid", label: "Kids", icon: "👶" },
    { value: "shoes", label: "Shoes", icon: "👟" },
  ];

  const productTypes = [
    { value: "all", label: "All Types" },
    { value: "Remera", label: "Remera" },
    { value: "Campera", label: "Campera" },
    { value: "Pantalon", label: "Pantalón" },
    { value: "Calzado", label: "Calzado" },
    { value: "Buzo", label: "Buzo" },
    { value: "Camisa", label: "Camisa" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Chaleco", label: "Chaleco" },
    { value: "Gorro", label: "Gorro" },
  ];

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const refreshProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/allproducts`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error refreshing products:", error);
    }
  };

  const DeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`${API_URL}/api/products/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.filter((product) => product._id !== id));
        showNotification("Product deleted successfully");
      } else {
        showNotification(data.message || "Failed to delete product", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Failed to delete product", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesType =
        selectedType === "all" || product.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [products, searchTerm, selectedCategory, selectedType]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products/allproducts`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setNotification({ message: "Failed to load products", type: "error" });
        setTimeout(() => setNotification(null), 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Management
        </h1>
        <p className="text-gray-600">Manage your store products</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Search Products
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
            >
              {productTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl">
              <div className="text-gray-900 text-sm font-medium">
                {filteredProducts.length} products
              </div>
              <div className="text-gray-500 text-xs">
                {currentPage} of {totalPages} pages
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <div className="inline-flex items-center space-x-3">
            <svg
              className="animate-spin w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-700">Loading products...</span>
          </div>
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <div className="space-y-4">
            <svg
              className="w-16 h-16 text-gray-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or add some products first.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
              >
                {/* Product Image */}
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl border border-gray-600/30"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.category === "women"
                          ? "bg-pink-50 text-pink-700"
                          : product.category === "men"
                            ? "bg-blue-50 text-blue-700"
                            : product.category === "kid"
                              ? "bg-green-50 text-green-700"
                              : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{product.type}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex space-x-1">
                        {product.sizes.slice(0, 3).map((size) => (
                          <span
                            key={size}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                            +{product.sizes.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteProduct(product._id)}
                      disabled={deletingId === product._id}
                      className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === product._id ? (
                        <svg
                          className="animate-spin w-4 h-4 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-gray-600 text-sm">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)}{" "}
                  of {filteredProducts.length} products
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        const distance = Math.abs(page - currentPage);
                        return (
                          distance === 0 ||
                          distance === 1 ||
                          page === 1 ||
                          page === totalPages
                        );
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                              page === currentPage
                                ? "bg-gray-900 text-white"
                                : "bg-white hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-xl backdrop-blur-xl border animate-fade-in flex items-center space-x-3 z-50 ${
            notification.type === "success"
              ? "bg-green-500/95 border-green-400/50 shadow-green-500/20"
              : "bg-red-500/95 border-red-400/50 shadow-red-500/20"
          }`}
        >
          <div className="flex-shrink-0">
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5 text-green-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-white font-medium">{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={refreshProducts}
        />
      )}
    </div>
  );
};
