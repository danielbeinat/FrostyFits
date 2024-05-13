import "./Breadcrumbs.scss";
import { Link } from "react-router-dom";

export const Breadcrumbs = (props) => {
  const { product } = props;
  return (
    <>
      <div className="breadcrumbs">
        <Link className="link" to="/">
          Inicio
        </Link>
        <span className="chevron">{"/"}</span>

        <Link className="link" to={`/${product.category}`}>
          {product.category}
        </Link>
        <span className="chevron">{"/"}</span>

        <span> {product.name}</span>
      </div>
    </>
  );
};
