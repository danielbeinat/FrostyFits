import { useContext, useEffect, useState } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import "./scss/Category.scss";
import { Item } from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
// import { Newsletter } from "../Components/Main/Newsletter/Newsletter";

export const Category = (props) => {
  const { Allproducts } = useContext(ShoopContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    setSortedProducts([...Allproducts]);
  }, [Allproducts]);

  const handleSortChange = (e) => {
    const value = e.target.value;
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

  // Función para calcular el precio con descuento aplicado
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
                <Link
                  to={`/${props.category.toLowerCase()}`}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {props.category}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="sort">
            <h1>Ordenar por: </h1>

            <select
              className="h-8 w-60 text-xs border-2 border-gray-400 rounded-md"
              id="sort"
              name="sort"
              onChange={handleSortChange}
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
        <div className="products">
          {sortedProducts.map((product, i) => {
            if (product.category === props.category) {
              return (
                <Item
                  key={i}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={calculatePrice(product)}
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
        {/* <Newsletter /> */}
      </div>
    </>
  );
};
