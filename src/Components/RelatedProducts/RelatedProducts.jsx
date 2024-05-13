import "./RelatedProducts.scss";
import { Item } from "../Item/Item";
import { Allproducts } from "../../assets/allProducts/allProducts";

export const RelatedProducts = ({ category }) => {
  const Products = Allproducts.filter(
    (item) => item.category === category
  ).slice(0, 4);

  return (
    <>
      <div className="relatedproduct">
        <h1 className="text-center text-3xl">Productos Relacionados</h1>

        <div className="items">
          {Products.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};
