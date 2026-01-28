import { useState, useRef } from "react";
import { API_URL } from "../../config/config.js";

export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const [productDetail, setProductDetail] = useState({
    name: "",
    image: "",
    price: "",
    category: "women",
    type: "",
    sizes: [],
    discount: "",
    stock: "",
  });

  const productTypes = [
    { value: "Remera", label: "Remera", icon: "👕" },
    { value: "Campera", label: "Campera", icon: "🧥" },
    { value: "Pantalon", label: "Pantalón", icon: "👖" },
    { value: "Calzado", label: "Calzado", icon: "👟" },
    { value: "Buzo", label: "Buzo", icon: "🦺" },
    { value: "Camisa", label: "Camisa", icon: "👔" },
    { value: "Bermuda", label: "Bermuda", icon: "🩳" },
    { value: "Chaleco", label: "Chaleco", icon: "🧥" },
    { value: "Gorro", label: "Gorro", icon: "🧢" },
  ];

  const categories = [
    { value: "women", label: "Women", icon: "👩" },
    { value: "men", label: "Men", icon: "👨" },
    { value: "kid", label: "Kids", icon: "👶" },
    { value: "shoes", label: "Shoes", icon: "👟" },
  ];

  const getSizesForType = (type) => {
    switch (type) {
      case "Remera":
      case "Campera":
      case "Buzo":
      case "Chaleco":
        return ["S", "M", "L", "XL"];
      case "Pantalon":
      case "Bermuda":
        return ["28", "30", "32", "34", "36"];
      case "Calzado":
        return ["38", "39", "40", "41", "42"];
      case "Camisa":
        return ["XS", "S", "M", "L", "XL", "XXL"];
      case "Gorro":
        return null;
      default:
        return [];
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      showNotification("Please select a valid image file", "error");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    handleImageFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetail((prevDetail) => ({ ...prevDetail, [name]: value }));

    if (notification) setNotification(null);
  };
  const toggleApplyDiscount = () => {
    setApplyDiscount((prev) => {
      const next = !prev;
      setProductDetail((pd) => ({
        ...pd,
        discount: next ? (pd.discount === "" ? 0 : pd.discount) : 0,
      }));
      return next;
    });
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setProductDetail((prevDetail) => ({
      ...prevDetail,
      type: selectedType,
      sizes: [],
    }));
    const sizesForType = getSizesForType(selectedType);
    setSizes(sizesForType || []);
  };

  const handleSizeToggle = (size) => {
    setProductDetail((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const validateForm = () => {
    if (!productDetail.name.trim()) return "Product name is required";
    if (!productDetail.price || isNaN(productDetail.price))
      return "Valid price is required";
    if (!productDetail.type) return "Product type is required";
    if (!productDetail.stock || isNaN(productDetail.stock))
      return "Valid stock is required";
    if (!image) return "Product image is required";
    return null;
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      showNotification(validationError, "error");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const updatedProduct = {
          ...productDetail,
          image: uploadData.image_url,
          price: Number(productDetail.price) || 0,
          stock: Number(productDetail.stock) || 0,
          discount: Number(productDetail.discount || 0),
        };

        const addProductResponse = await fetch(`${API_URL}/api/products/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          showNotification("Product added successfully!", "success");

          setProductDetail({
            name: "",
            image: "",
            price: "",
            category: "women",
            type: "",
            sizes: [],
            discount: "",
            stock: "",
          });
          setImage(null);
          setSizes([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          showNotification("Failed to add product. Please try again.", "error");
        }
      } else {
        showNotification("Failed to upload image. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification("An error occurred. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600">
          Fill in the details below to add a new product to your store
        </p>
      </div>

      <form onSubmit={addProduct} className="space-y-8">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={productDetail.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
                    placeholder="Enter product name"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-200 ${
                      focusedField === "name" || productDetail.name
                        ? "w-full"
                        : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={productDetail.price}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("price")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-200 ${
                      focusedField === "price" || productDetail.price
                        ? "w-full"
                        : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <button
                    type="button"
                    onClick={toggleApplyDiscount}
                    className={`inline-flex items-center px-3 py-2 rounded-lg border ${
                      applyDiscount
                        ? "border-gray-900 bg-gray-100 text-gray-900"
                        : "border-gray-300 bg-white text-gray-700"
                    } transition-colors`}
                  >
                    {applyDiscount ? "Aplicar descuento" : "Sin descuento"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="discount"
                    value={productDetail.discount}
                    onChange={handleChange}
                    disabled={!applyDiscount}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
                    placeholder="0"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Stock *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="stock"
                    value={productDetail.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 outline-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {productTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        handleTypeChange({ target: { value: type.value } })
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        productDetail.type === type.value
                          ? "border-gray-900 bg-gray-100 text-gray-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg mr-2">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "category", value: category.value },
                        })
                      }
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        productDetail.category === category.value
                          ? "border-gray-900 bg-gray-100 text-gray-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg mr-3">{category.icon}</span>
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                    dragActive
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    {image ? (
                      <div className="space-y-4">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-lg mx-auto border border-gray-200"
                        />
                        <div>
                          <p className="text-green-400 font-medium">
                            Image selected
                          </p>
                          <p className="text-gray-400 text-sm">{image.name}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-gray-500 text-sm">
                            PNG, JPG, WEBP up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {productDetail.type &&
            productDetail.type !== "Gorro" &&
            sizes.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          productDetail.sizes.includes(size)
                            ? "border-gray-900 bg-gray-100 text-gray-900"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {productDetail.sizes.length > 0 && (
                    <p className="text-sm text-gray-500">
                      Selected: {productDetail.sizes.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className="px-8 py-4 bg-gray-900 hover:bg-black disabled:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-3 group"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
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
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </form>

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
    </div>
  );
};
