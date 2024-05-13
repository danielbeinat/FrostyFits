import { Item } from "../Item/Item";
export const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
          {products.map((item) => (
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
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};
