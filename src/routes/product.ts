import express,{ Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";



export function productRoutes(): Router {
    const router: Router = express.Router();
    console.log("product...");

    router.post("/add-product",addProduct);
    router.get("/", getProducts);
    router.get("/get-product/:id", getProductById);
    router.put("/update-product/:id", updateProduct);
    router.delete("/delete-product/:id", deleteProduct);

    return router;
}

