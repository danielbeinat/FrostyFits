import { Allproducts } from "../../../assets/allProducts/allProducts";
import { Item } from "../../Item/Item";
import "./News.scss";

export const News = () => {
  const sortedProducts = Allproducts.sort((a, b) => a.price - b.price);

  const newestProducts = sortedProducts.slice(0, 8);

  return (
    <>
      <div className="news">
        <h1 className="text-center text-3xl">Novedades</h1>
        <section className="products">
          {newestProducts.map((item) => (
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
