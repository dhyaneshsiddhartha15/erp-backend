import express,{ Router } from "express";
import { addProduct, deleteProduct, getProductById, updateProduct } from "../controllers/product.controller";



const router:Router =express.Router();

export function productRoutes():Router{

    console.log("product...")
    router.post("/add-product",addProduct);
    router.put("/update-product/:id", updateProduct);
    router.delete("/delete-product/:id",deleteProduct);
    router.get("/get-product/:id", getProductById);

   return router;
}