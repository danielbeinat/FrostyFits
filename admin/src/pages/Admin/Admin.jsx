import React from "react";
import { Sidebar } from "../../component/Sidebar";
import { Routes, Route } from "react-router-dom";
import { AddProduct } from "../../component/AddProduct";
import { ProductList } from "../../component/ProductList";

export const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />

      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </div>
  );
};
