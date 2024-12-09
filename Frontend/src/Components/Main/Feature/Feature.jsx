import { useState, useEffect } from "react";
import { Item } from "../../Item/Item";
import "./Feature.scss";
import { API_URL } from "../../../config/config.js";

export const Feature = () => {
  const [Trading, setTrading] = useState([]);

  const FetchTrading = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/trending`);

      const data = await response.json();

      setTrading(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchTrading();
  }, []);
  return (
    <>
      <div className="feature font-parkinsans">
        <h1 className="text-center text-3xl">Tendencia</h1>
        <section className="destacado">
          {Trading.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              category={item.category}
              item={item}
              name={item.name}
              image={item.image}
              price={item.price}
              // discount={item.discount}
              // description={item.description}
            />
          ))}
        </section>
      </div>
    </>
  );
};
