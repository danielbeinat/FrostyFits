import { useContext } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import "./scss/Category.scss";
import { Item } from "../Components/Item/Item";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Category = (props) => {
  const { Allproducts } = useContext(ShoopContext);
  const [sortedProducts, setSortedProducts] = useState([...Allproducts]);

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
          <div className="breadcrumb">
            <Link className="text" to="/">
              Inicio
            </Link>

            <span>{`/`}</span>

            <span>{props.category}</span>
          </div>
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
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={calculatePrice(product)}
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
          <button>Ver mas</button>
        </div>
      </div>
    </>
  );
};
