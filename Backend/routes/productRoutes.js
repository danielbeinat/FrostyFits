import express from "express";
import {
    addProduct,
    removeProduct,
    updateProduct,
    getAllProducts,
    newCollection,
    trending,

} from "../controllers/productController.js";


const router = express.Router();

router.post("/add", addProduct);
router.post("/removeproduct", removeProduct);
router.post("/update", updateProduct);
router.get("/allproducts", getAllProducts);
router.get("/newcollection", newCollection);
router.get("/trending", trending);

export default router;
