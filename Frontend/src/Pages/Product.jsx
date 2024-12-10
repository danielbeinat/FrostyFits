import { useContext } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../Components/breadcrumbs/Breadcrumbs";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";

export const Product = () => {
  const { Allproducts } = useContext(ShoopContext);
  const { productId } = useParams();

  // Verificar si Allproducts está definido y no está vacío
  if (!Allproducts || Allproducts.length === 0) {
    return <div>Cargando productos...</div>;
  }

  const product = Allproducts.find((e) => e._id === productId);

  // Verificar si el producto existe
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-5 py-3">
        <Breadcrumbs product={product} />
        <ProductDisplay product={product} />
        <RelatedProducts category={product.category} />
      </div>
    </>
  );
};
