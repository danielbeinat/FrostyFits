import { useContext } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../Components/breadcrumbs/Breadcrumbs";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";

export const Product = () => {
  const { Allproducts } = useContext(ShoopContext);
  const { productId } = useParams();

  const product = Allproducts.find((e) => e.id === Number(productId));

  return (
    <>
      <div className="pt-6">
        <Breadcrumbs product={product} />
        <ProductDisplay product={product} />
        <RelatedProducts category={product.category} />
      </div>
    </>
  );
};
