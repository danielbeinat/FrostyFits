import express from "express";
import {
    addProduct,
    removeProduct,
    updateProduct,
    allproducts,
    newcollection,
    trendingproducts,
    getProductById,
    getProductsByCategory,
    searchProducts
} from "../controllers/productController.js";
import { validate, schemas } from "../utils/validation.js";

const router = express.Router();

router.post("/add", validate(schemas.product), addProduct);
router.post("/removeproduct", removeProduct);
router.post("/update", validate(schemas.productUpdate), updateProduct);
router.get("/allproducts", allproducts);
router.get("/newcollection", newcollection);
router.get("/trending", trendingproducts);
router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

export default router;
