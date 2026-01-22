import { useContext, useEffect, useState } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import "./scss/Category.scss";
import { Item } from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

export const Category = (props) => {
  const { Allproducts } = useContext(ShoopContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    setSortedProducts(Array.isArray(Allproducts) ? [...Allproducts] : []);
  }, [Allproducts]);

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (!Array.isArray(Allproducts)) {
      setSortedProducts([]);
      return;
    }

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

    setSortedProducts(newSortedProducts);
  };

  const calculatePrice = (product) => {
    return product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  };

  return (
    <>
      <div className="category">
        <div className="dropdown">
          <nav aria-label="Breadcrumb" className="font-parkinsans">
            <ol className="flex flex-wrap items-center gap-2 px-6 py-4 sm:px-8 lg:px-12 bg-gray-50 border-b border-gray-200">
              <li>
                <Link
                  to="/"
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only">Inicio</span>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <Link
                  to={`/${props.category.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {props.category}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="sort">
            <label
              htmlFor="sort"
              className="text-sm font-semibold text-gray-700"
            >
              Ordenar por:
            </label>
            <select
              className="h-10 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer hover:border-gray-400"
              id="sort"
              name="sort"
              onChange={handleSortChange}
            >
              <option value="Menor a Mayor">Precio: de Menor a Mayor</option>
              <option value="Mayor a Menor">Precio: de Mayor a Menor</option>
            </select>
          </div>
        </div>
        <div className="products">
          {sortedProducts.map((product, i) => {
            if (product.category === props.category) {
              return (
                <Item
                  key={i}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  discount={product.discount}
                  description={product.description}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="more">
          <button>Ver más</button>
        </div>
      </div>
    </>
  );
};
