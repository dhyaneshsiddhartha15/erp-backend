import express,{ Router } from "express";
import {
    addInventory,
    updateInventory,
    deleteInventory,
    getInventory,
    getInventoryById,
    increaseStock,
    removeStock,
    lowStockAlert,
    checkExpiredItems,
    inventoryValuation 
} from "../controllers/inventory.controller";


const router:Router =express.Router();

export function inventoryRoutes():Router{

    console.log("inventory..")
    router.post("/inventory", addInventory);
    router.put("/inventory/:id", updateInventory);
    router.delete("/inventory/:id", deleteInventory);
    router.get("/inventory/:id",  getInventoryById);
    router.get("/inventories",  getInventory);
   router.post("/add-stock", increaseStock);
  router.post("/remove-stock", removeStock);
   router.get("/low-stock", lowStockAlert);
  router.get("/expired-items",checkExpiredItems);
  router.get("/inventory-valuation", inventoryValuation);
   return router;
}