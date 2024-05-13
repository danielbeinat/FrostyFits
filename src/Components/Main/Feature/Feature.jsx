import { Allproducts } from "../../../assets/allProducts/allProducts";
import { Item } from "../../Item/Item";
import "./Feature.scss";

export const Feature = () => {
  const sortedProducts = Allproducts.sort((a, b) => b.rating - a.rating);

  const topRatedProducts = sortedProducts.slice(0, 8);

  return (
    <>
      <div className="feature">
        <h1 className="text-center text-3xl">Tendencia</h1>
        <section className="destacado">
          {topRatedProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              category={item.category}
              item={item}
              name={item.name}
              image={item.image}
              price={item.price}
              discount={item.discount}
              description={item.description}
            />
          ))}
        </section>
      </div>
    </>
  );
};
