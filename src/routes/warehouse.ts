import express, { Router } from "express";
import {
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehouseById,
    listWarehouses,
} from "../controllers/warehouse.controller";

const router: Router = express.Router();

export function warehouseRoutes(): Router {
    console.log("Warehouse routes initialized...");

    // Route to create a new warehouse
    router.post("/warehouse", addWarehouse);

    // Route to update warehouse by ID
    router.put("/warehouse/:id", updateWarehouse);

    // Route to delete a warehouse by ID
    router.delete("/warehouse/:id", deleteWarehouse);

    // Route to get a specific warehouse by ID
    router.get("/warehouse/:id", getWarehouseById);

    // Route to list all warehouses
    router.get("/warehouses", listWarehouses);

    return router;
}
