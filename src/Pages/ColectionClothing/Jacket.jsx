import { useContext, useState, useEffect } from "react";
import { ShoopContext } from "../../Context/ShoopContext";
import { Item } from "../../Components/Item/Item";
import { Link } from "react-router-dom";

export const Jacket = () => {
  const { Allproducts } = useContext(ShoopContext);
  const [sortedProducts, setSortedProducts] = useState([...Allproducts]);
  const [sortValue, setSortValue] = useState("Menor a Mayor");

  useEffect(() => {
    // Ordenar los productos cuando Allproducts cambie
    handleSortChange(sortValue);
  }, [Allproducts, sortValue]); // Se ejecutará cada vez que Allproducts o sortValue cambien

  const handleSortChange = (value) => {
    setSortValue(value); // Actualizar el estado del valor de orden
    let newSortedProducts = [...Allproducts];

    switch (value) {
      case "Menor a Mayor":
        newSortedProducts.sort((a, b) => calculatePrice(a) - calculatePrice(b));
        break;
      case "Mayor a Menor":
        newSortedProducts.sort((a, b) => calculatePrice(b) - calculatePrice(a));
        break;
      default:
        break;
    }

    // Filtrar los productos por tipo "Jean"
    newSortedProducts = newSortedProducts.filter(
      (item) => item.type === "Campera"
    );

    setSortedProducts(newSortedProducts);
  };

  const calculatePrice = (product) => {
    return product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  };

  return (
    <>
      <div className="mt-20 px-7 mb-[90px]">
        <div className="flex justify-between px-2 mb-8">
          <div className="flex">
            <Link className="font-bold" to="/">
              Inicio
            </Link>

            <span>{`/`}</span>

            <span>{"Camperas"}</span>
          </div>
          <div className="sort flex gap-2">
            <h1>Ordenar por: </h1>

            <select
              className="h-8 w-60 text-xs border-2 border-gray-400 rounded-md"
              id="sort"
              name="sort"
              value={sortValue}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option className="text-xs" value="Menor a Mayor">
                Precio: de Menor a Mayor
              </option>
              <option className="text-xs" value="Mayor a Menor">
                Precio: de Mayor a Menor
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 px-2 md:grid-cols-4 lg:grid-cols-4">
          {sortedProducts.map((item) => (
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
      </div>
    </>
  );
};
