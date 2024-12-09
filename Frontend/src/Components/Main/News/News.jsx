import { useState, useEffect } from "react";
import { Item } from "../../Item/Item";
import "./News.scss";
import { API_URL } from "../../../config/config.js";

export const News = () => {
  const [Allproducts, setAllproducts] = useState([]);

  const FetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/newcollection`);

      const data = await response.json();

      setAllproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchNews();
  }, []);
  return (
    <>
      <div className="news font-parkinsans">
        <h1 className="text-center text-3xl">Novedades</h1>
        <section className="products">
          {Allproducts.map((item) => (
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
