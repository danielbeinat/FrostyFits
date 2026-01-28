import "./RelatedProducts.scss";
import { Item } from "../Item/Item";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/config.js";

export const RelatedProducts = ({ category }) => {
  const [related, setrelated] = useState([]);

  const FetchRelated = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/allproducts`);
      const data = await response.json();

      if (data.success && Array.isArray(data.products)) {
        setrelated(data.products);
      } else {
        console.error("Invalid products data:", data);
        setrelated([]);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      setrelated([]);
    }
  };

  useEffect(() => {
    FetchRelated();
  }, []);

  const Products = Array.isArray(related)
    ? related.filter((item) => item.category === category).slice(0, 4)
    : [];

  return (
    <>
      <div className="relatedproduct font-parkinsans">
        <h1 className="text-center text-3xl">Productos Relacionados</h1>

        <div className="items">
          {Products.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};
