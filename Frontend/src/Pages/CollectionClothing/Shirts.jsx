import { useContext, useState, useEffect } from "react";
import { ShoopContext } from "../../Context/ShoopContext";
import { Item } from "../../Components/Item/Item";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Shirts = () => {
  const { Allproducts } = useContext(ShoopContext);
  const [sortedProducts, setSortedProducts] = useState(
    Array.isArray(Allproducts) ? [...Allproducts] : [],
  );
  const [sortValue, setSortValue] = useState("Menor a Mayor");

  useEffect(() => {
    if (!Array.isArray(Allproducts)) {
      setSortedProducts([]);
      return;
    }

    let newSortedProducts = [...Allproducts];

    switch (sortValue) {
      case "Menor a Mayor":
        newSortedProducts.sort((a, b) => calculatePrice(a) - calculatePrice(b));
        break;
      case "Mayor a Menor":
        newSortedProducts.sort((a, b) => calculatePrice(b) - calculatePrice(a));
        break;
      default:
        break;
    }

    newSortedProducts = newSortedProducts.filter(
      (item) => item.type === "Remera",
    );

    setSortedProducts(newSortedProducts);
  }, [sortValue, Allproducts]);

  const calculatePrice = (product) => {
    return product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  };

  return (
    <>
      <div className="md:mt-10 mt-10 md:px-7 mb-[90px]">
        <div className="flex justify-between items-center gap-10 flex-col md:flex-row px-2 mb-8">
          <nav aria-label="Breadcrumb" className="font-parkinsans">
            <ol className="flex flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
              <li>
                <Link
                  to={"/"}
                  className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only">Inicio</span>
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <span
                  className="text-sm font-medium text-gray-900"
                  aria-current="page"
                >
                  Camperas
                </span>
              </li>
            </ol>
          </nav>
          <div className="sort flex flex-col md:flex-row items-start md:items-center md:flex gap-2">
            <h1 className="text-xs md:text-sm text-start">Ordenar por: </h1>

            <select
              className="h-8 w-60 text-xs border-2 border-gray-400 rounded-md"
              id="sort"
              name="sort"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
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
        <div className="grid grid-cols-1 gap-10 md:px-2 px-5 md:grid-cols-4 lg:grid-cols-4">
          {sortedProducts.map((item) => (
            <Item
              key={item._id}
              id={item._id}
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
