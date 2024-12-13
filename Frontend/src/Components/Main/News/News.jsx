import { useState, useEffect } from "react";
import { Item } from "../../Item/Item";
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
    <div className="flex flex-col gap-6 mx-8 mt-5 font-parkinsans">
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-800">
        Novedades
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 justify-items-center lg:grid-cols-4  gap-10">
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
  );
};
