import { useState, useEffect } from "react";
import { Item } from "../../Item/Item";
import { API_URL } from "../../../config/config.js";

export const Feature = () => {
  const [Trading, setTrading] = useState([]);

  const FetchTrading = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/trending`);

      const data = await response.json();

      if (data.success && Array.isArray(data.products)) {
        setTrading(data.products);
      } else {
        console.error("Invalid products data:", data);
        setTrading([]);
      }
    } catch (error) {
      console.error("Error fetching trading products:", error);
      setTrading([]);
    }
  };

  useEffect(() => {
    FetchTrading();
  }, []);
  return (
    <div
      id="tendencia"
      className="flex flex-col gap-6 mx-8 my-[100px]  font-parkinsans"
    >
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-800">
        Tendencia
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 justify-items-center lg:grid-cols-4  gap-10">
        {Array.isArray(Trading) &&
          Trading.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              category={item.category}
              item={item}
              name={item.name}
              image={item.image}
              price={item.price}
              discount={item.discount}
              // description={item.description}
            />
          ))}
      </section>
    </div>
  );
};
