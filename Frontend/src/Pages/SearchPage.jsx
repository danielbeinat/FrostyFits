import { useContext } from "react";
import { ShoopContext } from "../Context/ShoopContext";
import { useParams } from "react-router-dom";
import { ProductList } from "../Components/ProductList/ProductList";

export const SearchPage = () => {
  const { Allproducts } = useContext(ShoopContext);
  const { searchQuery } = useParams();

  const filteredProducts = Allproducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-8 font-parkinsans">
      <h2 className="md:text-start md:pb-8 mb-4 md:text-xl text-lg text-center py-4 font-bold">
        Resultados de búsqueda para: {searchQuery}
      </h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};
