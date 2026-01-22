import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Dashboard";
import { AddProduct } from "../components/forms/AddProduct";
import { ProductList } from "../components/products/ProductList";

export const Admin = () => {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </div>
  );
};
