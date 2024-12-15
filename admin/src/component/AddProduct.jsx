import React, { useState } from "react";
import upload from "../assets/upload.svg";
import { API_URL } from "../config/config.js";

export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const [productDetail, setProductDetail] = useState({
    name: "",
    image: "",
    price: "",
    category: "women",
    type: "",
    sizes: [],
  });

  const getSizesForType = (type) => {
    switch (type) {
      case "Remera":
        return ["S", "M", "L", "XL"];
      case "Campera":
        return ["S", "M", "L", "XL"];
      case "Pantalon":
        return ["28", "30", "32", "34", "36"];
      case "Calzado":
        return ["38", "39", "40", "41", "42"];
      case "Buzo":
        return ["S", "M", "L", "XL"];
      case "Camisa":
        return ["xs", "s", "m", "l", "xl", "xxl"];
      case "Bermuda":
        return ["28", "30", "32", "34", "36"];
      case "Chaleco":
        return ["S", "M", "L", "XL"];
      case "Gorro":
        return null;

      default:
        return [];
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setProductDetail((prevDetail) => ({
      ...prevDetail,
      type: selectedType,
      sizes: [],
    }));
    const sizesForType = getSizesForType(selectedType);
    setSizes(sizesForType || []); // Si sizesForType es null, establece sizes como un array vacío
  };

  const addProduct = async (e) => {
    e.preventDefault();
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
          console.log("Product added successfully");
          setResponseMessage("Product added successfully!");

          setProductDetail({
            name: "",
            image: "",
            price: "",
            category: "women",
            type: "",
            sizes: [],
          });
          setImage(null);
        } else {
          console.error("Failed to add product");
          setResponseMessage("Failed to add product.");
        }

        setTimeout(() => {
          setResponseMessage("");
        }, 3000);
      } else {
        console.error("Failed to upload image");
        setResponseMessage("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  };

  return (
    <div className="mt-8 ml-10 w-auto">
      <form
        className="flex flex-col bg-white p-10 gap-5 w-[600px] shadow-lg"
        onSubmit={addProduct}
      >
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Product Title</label>
          <input
            className="border border-gray-700 p-2"
            type="text"
            name="name"
            value={productDetail.name}
            onChange={handleChange}
            placeholder="Product Title"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Price</label>
          <input
            className="border border-gray-700 p-2 shadow-sm"
            type="text"
            placeholder="Price"
            name="price"
            value={productDetail.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Type</label>
          <select
            className="border w-[200px] border-gray-700 p-2 shadow-sm"
            name="type"
            value={productDetail.type}
            onChange={handleTypeChange}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Campera">Campera</option>
            <option value="Pantalon">Pantalón</option>
            <option value="Remera">Remera</option>
            <option value="Calzado">Calzado</option>
            <option value="Chaleco">Chaleco</option>
            <option value="Buzo">Buzo</option>
            <option value="Camisa">Camisa</option>
            <option value="Gorro">Gorro</option>
            <option value="Bermuda">Bermuda</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Category</label>
          <select
            className="border w-[200px] border-gray-700 p-2 shadow-sm"
            name="category"
            value={productDetail.category}
            onChange={handleChange}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        <div className="flex flex-col w-[100px]">
          <label className="cursor-pointer" htmlFor="file-input">
            <img
              className="w-[70px] h-[70px] bg-gray-100 p-2 shadow-sm"
              src={image ? URL.createObjectURL(image) : upload}
              alt=""
            />
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="file-input"
            name="image"
            hidden
          />
        </div>

        {/* <div className="flex flex-col">
          {productDetail.type !== "Gorro" && (
            <label className="text-sm text-gray-600">Sizes</label>
          )}
          <select
            className="border w-[200px] border-gray-700 p-2 shadow-sm"
            name="sizes"
            multiple
            value={productDetail.sizes}
            onChange={(e) => {
              const selectedSizes = Array.from(e.target.selectedOptions).map(
                (option) => option.value
              );
              setProductDetail((prevDetail) => ({
                ...prevDetail,
                sizes: selectedSizes,
              }));
            }}
            disabled={productDetail.type === "Gorro"} // Deshabilitar si el tipo es gorro
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div> */}

        <div className="flex flex-col">
          {productDetail.type !== "Gorro" && (
            <>
              <label className="text-sm text-gray-600">Sizes</label>
              <select
                className="border w-[200px] border-gray-700 p-2 shadow-sm"
                name="sizes"
                multiple
                value={productDetail.sizes}
                onChange={(e) => {
                  const selectedSizes = Array.from(
                    e.target.selectedOptions
                  ).map((option) => option.value);
                  setProductDetail((prevDetail) => ({
                    ...prevDetail,
                    sizes: selectedSizes,
                  }));
                }}
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <button className="bg-black text-white w-[200px] p-2" type="submit">
          Add Product
        </button>

        {responseMessage && (
          <p className="text-black fixed bottom-0 right-0 p-4 z-50 bg-white">
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};
