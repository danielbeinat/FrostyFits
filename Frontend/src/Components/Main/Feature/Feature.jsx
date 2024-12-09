import { useState, useEffect } from "react";
import { Item } from "../../Item/Item";
import "./Feature.scss";

export const Feature = () => {
  const [Trading, setTrading] = useState([]);

  const FetchTrading = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/trending"
      );

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
