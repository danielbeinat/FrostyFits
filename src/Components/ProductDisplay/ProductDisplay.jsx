import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { ProductSlider } from "./ProuductSlider/ProductSlider";
import { CartModal } from "../CartModal/CartModal";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./ProductDisplay.scss";
import { useContext } from "react";
import { ShoopContext } from "../../Context/ShoopContext";
export const ProductDisplay = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { product } = props;
  const { addToCart } = useContext(ShoopContext);
  return (
    <>
      <div className="product-display">
        <div className="product-left">
          <ProductSlider product={product} />
        </div>
        <div className="product-right">
          <h1>{product.name}</h1>
          <div className="star">
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
            </Stack>

            <p>({product.rating})</p>
          </div>
          <div className="product-price">
            <h2>${product.price.toLocaleString()}</h2>
          </div>
          <div className="product-description">
            <div className="card">
              <i className="fa-regular fa-credit-card"></i>
              <p>{product.description}</p>
            </div>

            <h3>{product.ofert}</h3>
          </div>
          <div className="product-size">
            <h1>Talla</h1>

            <div className="size">
              {product.sizes.map((size) => (
                <p key={size}>{size}</p>
              ))}
            </div>
          </div>
          <Link onClick={toggleModal}>
            <button onClick={() => addToCart(product.id)}>
              Agregar al Carrito
            </button>
          </Link>
        </div>
      </div>
      <CartModal open={isOpen} setOpen={setIsOpen} />
    </>
  );
};
