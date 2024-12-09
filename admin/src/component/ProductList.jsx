import { useState, useEffect } from "react";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const FetchProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/allproducts"
      );

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/removeproduct`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setProducts(products.filter((product) => product._id !== id)); // Filtrar usando _id
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []); // Nota la dependencia vacía aquí

  return (
    <table className="w-[900px] ml-10 divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                src={product.image}
                alt={product.name}
                width="80"
                height="80"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => DeleteProduct(product._id)}
                className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
